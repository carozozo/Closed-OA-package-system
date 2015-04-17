tm.main = (function () {
    var self = {};
    var mainApi = tapi.main;

    /**
     * return variables for client
     * @returns {{err: *, res: *}}
     */
    self.getVarsC = function () {
        // get isProduction
        var isProduction = tcfg.isProduction;
        // get user's info ( by DB returned )
        var userInfo = tl.util.getUserInfo();
        // get user's permission
        var userPms = tl.util.getUserPms();
        // delete password-info
        if (userInfo) {
            delete userInfo.passwordHash;
            delete userInfo.passwordSalt;
        }
        var res = {
            isProduction: isProduction,
            userInfo: userInfo,
            userPms: userPms
        };
        if (tl.util.isLogon()) {
            // get all permissions
            res.pagePms = tl.util.getPagePms();
        }
        var ret = tl.systemMsg.extendRetObj({});
        return ret.setRetSuc(res);
//        return tl.systemMsg.setResultSuc(res);
    };
    /**
     * login user and return result
     * set session if success
     * @param opt
     * @returns {{err: *, res: *}}
     */
    self.loginC = function (opt) {
        var oMain = new mainApi(opt);
        oMain.loginApi();
        var retSuc = oMain.getRetSuc();
        if (!retSuc) {
            return oMain.getRetObj();
        }
        var status = tl.string.lowerStr(retSuc.status);
        if (status === 'disable') {
            // user is disabled, following api exception-response
            return oMain.setRetErr('USER_DISABLE');
        }
        // login success
        tl.util.loginSystem(retSuc.uid, retSuc.userName);
//        tl.util.setUid(retSuc.uid);
//        tl.util.setUserName(retSuc.userName);
        // set user's permission to permission
        tl.util.setUserPms(retSuc.roleJ.permissionId);
        // set user's info
        tl.util.setUserInfo(retSuc);
        return self.getVarsC();
    };
    self.logoutC = function () {
        tl.util.logoutSystem();
    };
    self.authPwdC = function (opt) {
        opt.userName = tl.util.getUserName();
        return self.loginC(opt);
    };
    self.getPageC = function (opt) {
        var page = opt.page;
        var tplType = opt.tplType;
        var tplModel = opt.tplModel;
        var html = tl.template.getHtmlCbr(page, tplType, tplModel);
        if (html === null) {
            return tl.systemMsg.setResultErr('Get page error');
        }
        return tl.systemMsg.setResultSuc(html);
    };
    /**
     * check file exists under /public
     * @param opt
     * @returns {{err: *, res: *}}
     */
    self.ifFileExistsC = function (opt) {
        var filePath = opt.filePath;
        filePath = tl.string.addHead(filePath, tg.webDir);
        var fileExists = tl.files.ifFileExists(filePath);
        return tl.systemMsg.setResultSuc(fileExists);
    };

    return self;
})();