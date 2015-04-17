module.exports = function (router) {
    tl.ctrLogger.addExcludeUrl('/main/api/getVars');
    tl.ctrLogger.addExcludeUrl('/main/api/getPage');

    router.post('/api/getVars', function () {
        var ret = tm.main.getVarsC();
        tl.systemMsg.printHttpResult(ret);
    });
    router.post('/api/login', function () {
        var param = tl.request.getReqParamAuto();
        var ret = tm.main.loginC(param);
        tl.systemMsg.printHttpResult(ret);
    });
    router.post('/api/logout', function () {
        tm.main.logoutC();
        var ret = tm.main.getVarsC();
        tl.systemMsg.printHttpResult(ret);
    });
    router.post('/api/authPwd', function () {
        var param = tl.request.getReqParamAuto();
        var ret = tm.main.authPwdC(param);
        tl.systemMsg.printHttpResult(ret);
    });
    router.post('/api/getPage', function () {
        var param = tl.request.getReqParamAuto();
        var ret = tm.main.getPageC(param);
        tl.systemMsg.printHttpResult(ret);
    });
    router.post('/api/ifFileExists', function () {
        var param = tl.request.getReqParamAuto();
        var ret = tm.main.ifFileExistsC(param);
        tl.systemMsg.printHttpResult(ret);
    });
};