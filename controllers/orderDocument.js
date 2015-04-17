module.exports = function (router) {
    router.post('/api/getOrderDocumentList', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderDocument.getOrderDocumentListC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    // TODO no test
    router.post('/api/createOrderDocument', function () {
        tl.util.authRequestCb(function apiCb() {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderDocument.createOrderDocumentC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
    // TODO no test
    router.post('/api/updateOrderDocument', function () {
        tl.util.authRequestCb(function apiCb() {
            var param = tl.request.getReqParamAuto();
            var ret = tm.orderDocument.updateOrderDocumentC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
};