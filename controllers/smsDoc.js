module.exports = function (router) {
    router.post('/api/sendSms', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.smsDoc.sendSmsC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
};