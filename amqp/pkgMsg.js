tg.emitter.on('amqpConnect', function () {
    var amqpCfg = tcfg.amqp;
    var queueNames = amqpCfg.queueNames;
    var subscriptQueue = function (queueName, subscribeFn) {
        tl.amqp.subscribeAmqpOne(queueName, function (queue, data) {
            var type = tl.string.lowerStr(data.type);
            if (!type) {
                queue.shift();
                return;
            }
            subscribeFn(type, queue, data);
        });
    };
    (function pkgMsgRequest() {
        var queueName = queueNames.pkgMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.emailDoc.sendEmailCbC(data, function () {
                        tm.smsDoc.sendSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    // to/subsject/[text/html]/[cc]/[bcc]
                    tm.emailDoc.sendEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    // phone/msg
                    tm.smsDoc.sendSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
});