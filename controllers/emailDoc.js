module.exports = function (router) {
    router.post('/api/sendEmail', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            tm.emailDoc.sendEmailCbC(param, function (ret) {
                tl.systemMsg.printHttpResult(ret);
            });
        });
    });
};