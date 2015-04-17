module.exports = function (router) {
    router.post('/api/getOrderReceiptSmsMsg', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderSms.getOrderReceiptSmsMsgC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPaymentConfirmedSmsMsg', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderSms.getPaymentConfirmedSmsMsgC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPaymentRejectedSmsMsg', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderSms.getPaymentRejectedSmsMsgC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getEticketSmsMsg', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderSms.getEticketSmsMsgC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPaymentRefundSmsMsg', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderSms.getPaymentRefundSmsMsgC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
};