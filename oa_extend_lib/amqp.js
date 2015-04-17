/**
 * The function for AMQP(Message Queue) base on node-amqp
 * plz refer to [https://github.com/postwait/node-amqp#connectionqueuename-options-opencallback]
 * @author Caro.Huang
 */
tl.amqp = (function () {
    var self = {};
    var amqpCfg = null;
    var defQueueOpt = null;
    var defExchangeCfg = null;
    var defExchangeName = null;
    var defExchangeOpt = null;
    var amqpReqUserKey = 'tgReqUser';
    var getAmqpConfig = function () {
        amqpCfg = amqpCfg || tcfg.amqp;
        defQueueOpt = defQueueOpt || amqpCfg.queueOptions;
        defExchangeCfg = defExchangeCfg || amqpCfg.exchangeConfig;
        defExchangeName = defExchangeName || defExchangeCfg.name;
        defExchangeOpt = defExchangeOpt || defExchangeCfg.options;
    };
    var getSubscribeOneRecordOpt = function () {
        return {
            ack: true,
            prefetchCount: 1
        };
    };
    var updateAmqpLog = function (logName, oMsg) {
        oMsg.time = tl.dateTime.formatNow('time');
        oMsg = tl.json.safeStringify(oMsg);
        tl.logger.updateLogWithDayFileName(logName, oMsg);
    };
    var updateAmqpSubscribeLog = function (oMsg) {
        var logName = 'amqp-subscribe';
        updateAmqpLog(logName, oMsg);
        tl.console.log2('Subscribe From Queue: ', oMsg);
    };
    var updateAmqpPublishLog = function (oMsg) {
        var logName = 'amqp-publish';
        updateAmqpLog(logName, oMsg);
        tl.console.log2('Publish To Queue: ', oMsg);
    };
    /**
     * connect to queue
     * OPT
     * queueOpt: obj (default: in oa-config) - queue options
     * @param queueName
     * @param opt
     * @param cb
     */
    self.connectQueue = function (queueName, opt, cb) {
        getAmqpConfig();
        var queueOpt = defQueueOpt;
        if (opt) {
            queueOpt = opt.queueOpt || queueOpt;
        }
        tg.amqpConnection.queue(queueName, queueOpt, function (queue) {
//        tl.console.log2('Connect To Queue: ', queue.name);
            cb && cb(queue);
        });
    };
    /**
     * subscribe from queue
     * OPT
     * queueOpt: obj (default: as config) - queue options
     * subscribeOpt: obj (default: null) - subscribe options
     * @param queueName
     * @param subscribeFn
     * @param [opt]
     */
    self.subscribeAmqp = function (queueName, subscribeFn, opt) {
        var subscribeOpt = null;
        var updateLog = function () {
            var logType = 'subscribe';
            if (subscribeOpt && subscribeOpt.ack === true && subscribeOpt.prefetchCount == 1) {
                logType = 'subscribeOneByOne';
            }
            var oLog = {
                type: logType,
                queueName: queueName
            };
            updateAmqpSubscribeLog(oLog);
        };
        if (opt) {
            subscribeOpt = opt.subscribeOpt || subscribeOpt;
        }
        self.connectQueue(queueName, opt, function (queue) {
            if (subscribeOpt) {
                queue.subscribe(subscribeOpt, function (data) {
                    updateLog();
                    subscribeFn(queue, data);
                });
                return;
            }
            queue.subscribe(function (data) {
                updateLog();
                subscribeFn(queue, data);
            });
        });
    };
    /**
     * subscribe from queue and get one-record
     * OPT
     * queueOpt: obj (default: as config) - queue options
     * subscribeOpt: obj (default: null) - subscribe options
     * @param queueName
     * @param subscribeFn
     * @param [opt]
     */
    self.subscribeAmqpOne = function (queueName, subscribeFn, opt) {
        opt = opt || {};
        opt.subscribeOpt = getSubscribeOneRecordOpt();
        self.subscribeAmqp(queueName, subscribeFn, opt);
    };
    /**
     * publish queue by exchange
     *
     * OPT
     * queueOpt: obj (default: as config) - queue options
     * exchangeName: obj (default: as config) - exchange name
     * exchangeOpt: obj (default: as config) - exchange options
     * reqUser: string (default: 'oa_system') - the request-user in data
     * @param queueName
     * @param routingKey
     * @param data
     * @param [publishCb]
     * @param [opt]
     */
    self.publishAmqp = function (queueName, routingKey, data, publishCb, opt) {
        getAmqpConfig();
        var exchangeName = defExchangeName;
        var exchangeOpt = defExchangeOpt;
        var reqUser = 'oa_system';
        if (opt) {
            exchangeName = opt.exchangeName || exchangeName;
            exchangeOpt = opt.exchangeOpt || exchangeOpt;
            reqUser = (tl.helper.isStr(opt.reqUser)) ? opt.reqUser : reqUser;
        }
        self.connectQueue(queueName, opt, function (queue) {
            // bind exchange to queue with routingKey
            queue.bind(exchangeName, routingKey);
            var exchange = tg.amqpConnection.exchange(exchangeName, exchangeOpt, function () {
                data[amqpReqUserKey] = reqUser;
                exchange.publish(routingKey, data, {}, function (err) {
                    var oLog = {
                        type: 'publish',
                        queueName: queueName,
                        exchangeName: exchangeName,
                        routingKey: routingKey
                    };
                    if (err) {
                        oLog.error = err;
                    }
                    updateAmqpPublishLog(oLog);
                    publishCb && publishCb(err);
                });
            });
        });
    };
    return self;
})();