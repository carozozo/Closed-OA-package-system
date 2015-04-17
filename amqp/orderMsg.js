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
//            tl.request.setRequestUser(data);
            subscribeFn(type, queue, data);
        });
    };
    (function orderReceiptMsgRequest() {
        var queueName = queueNames.orderReceiptMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.orderEmail.sendOrderReceiptEmailCbC(data, function () {
                        tm.orderSms.sendOrderReceiptSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendOrderReceiptEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendOrderReceiptSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function paymentConfirmedMsgRequest() {
        var queueName = queueNames.paymentConfirmedMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.orderEmail.sendPaymentConfirmedEmailCbC(data, function () {
                        tm.orderSms.sendPaymentConfirmedSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendPaymentConfirmedEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendPaymentConfirmedSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function paymentRejectedMsgRequest() {
        var queueName = queueNames.paymentRejectedMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.orderEmail.sendPaymentRejectedEmailCbC(data, function () {
                        tm.orderSms.sendPaymentRejectedSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendPaymentRejectedEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendPaymentRejectedSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function eTicketMsgRequest() {
        var queueName = queueNames.eTicketMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.orderEmail.sendEticketEmailCbC(data, function () {
                        tm.orderSms.sendEticketSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendEticketEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendEticketSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function flightItineraryMsgRequest() {
        var queueName = queueNames.flightItineraryRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            // only support email now
            switch (type) {
                case 'all':
                    tm.orderEmail.sendFlightItineraryEmailCbC(data, function () {
                        tm.orderSms.sendFlightItinerarySmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendFlightItineraryEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendFlightItinerarySmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function hotelVoucherMsgRequest() {
        var queueName = queueNames.hotelVoucherRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            // only support email now
            switch (type) {
                case 'all':
                    tm.orderEmail.sendHotelVoucherEmailCbC(data, function () {
                        tm.orderSms.sendHotelVoucherSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendHotelVoucherEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendHotelVoucherSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function eventVoucherMsgRequest() {
        var queueName = queueNames.eventVoucherRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            // only support email now
            switch (type) {
                case 'all':
                    tm.orderEmail.sendEventVoucherEmailCbC(data, function () {
                        tm.orderSms.sendEventVoucherSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendEventVoucherEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendEventVoucherSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function paymentRefundMsgRequest() {
        var queueName = queueNames.paymentRefundMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            switch (type) {
                case 'all':
                    tm.orderEmail.sendPaymentRefundEmailCbC(data, function () {
                        tm.orderSms.sendPaymentRefundSmsC(data);
                        queue.shift();
                    });
                    break;
                case 'email':
                    tm.orderEmail.sendPaymentRefundEmailCbC(data, function () {
                        queue.shift();
                    });
                    break;
                case 'sms':
                    tm.orderSms.sendPaymentRefundSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
    (function customerMsgRequest() {
        var queueName = queueNames.customerMsgRequest;
        subscriptQueue(queueName, function (type, queue, data) {
            // only support sms now
            switch (type) {
                case 'all':
                    tm.orderSms.sendCustomerSmsC(data);
                    queue.shift();
                    break;
                case 'email':
                    queue.shift();
                    break;
                case 'sms':
                    tm.orderSms.sendCustomerSmsC(data);
                    queue.shift();
                    break;
                default:
                    queue.shift();
                    break;
            }
        });
    })();
});