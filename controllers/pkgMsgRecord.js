module.exports = function (router) {
    router.post('/api/getPkgMsgMainTypeList', function () {
        tl.util.authRequestCb(function () {
            var ret = tm.pkgMsgRecord.getPkgMsgMainTypeListC();
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPkgMsgSubTypeList', function () {
        tl.util.authRequestCb(function () {
            var ret = tm.pkgMsgRecord.getPkgMsgSubTypeListC();
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPkgMsgStatusList', function () {
        tl.util.authRequestCb(function () {
            var ret = tm.pkgMsgRecord.getPkgMsgStatusListC();
            tl.systemMsg.printHttpResult(ret);
        });
    });
    router.post('/api/getPkgMsgRecordList', function () {
        tl.util.authRequestCb(function () {
            var param = tl.request.getReqParamAuto();
            var ret = tm.pkgMsgRecord.getPkgMsgRecordListC(param);
            tl.systemMsg.printHttpResult(ret);
        });
    });
};