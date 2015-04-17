/**
 * The common function for system-info
 * @author Caro.Huang
 */
tl.util = (function () {
    var self = {};

    self.loginSystem = function (uid, userName) {
        self.setUid(uid);
        self.setUserName(userName);
    };
    self.logoutSystem = function () {
        tl.session.cleanSession();
    };
    /**
     * check user if logon
     * @returns {*}
     */
    self.isLogon = function () {
        return self.getUid();
    };
    /**
     * get user-id
     * @returns {*}
     */
    self.getUid = function () {
        return tl.session.getSession('uid');
    };
    self.setUid = function (uid) {
        tl.session.setSession('uid', uid);
    };
    self.getUserName = function () {
        return tl.session.getSession('userName');
    };
    self.setUserName = function (userName) {
        tl.session.setSession('userName', userName);
    };
    return self;
})();