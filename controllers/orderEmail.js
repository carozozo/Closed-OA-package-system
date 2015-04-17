module.exports = function (router) {
    router.post('/api/getOrderReceiptEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getOrderReceiptEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getPaymentConfirmedEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getPaymentConfirmedEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getPaymentRejectedEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getPaymentRejectedEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getEticketEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getEticketEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getEventVoucherEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getEventVoucherEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getFlightItineraryEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getFlightItineraryEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getHotelVoucherEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getHotelVoucherEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
    router.post('/api/getPaymentRefundEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.orderEmail.getPaymentRefundEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
};