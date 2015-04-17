/**
 * The extend lib for tl.util
 * @author Caro.Huang
 */
tl.util = (function () {
    var self = tl.util;
    var pagePms = {
        superAdminPms: 'Super Admin'
    };

    /**
     * get log-on userName or userName in http-request header
     * @returns {*}
     */
    self.getUserName = function () {
        return tl.session.getSession('userName') || (function () {
            var httpRequestUserKey = tcfg.httpRequestUserKey;
            if (!httpRequestUserKey) {
                return null;
            }
            httpRequestUserKey = tl.string.lowerStr(httpRequestUserKey);
            return tl.request.getReqHeader(httpRequestUserKey);
        })();
    };
    /**
     * auth request user
     * reject if no user or has no permission
     * fire callback fn if pass
     * @param cb
     * @param [pms]
     */
    self.authRequestCb = function (cb, pms) {
        if (!self.getUserName()) {
            tl.systemRes.resNoUser();
            return;
        }
        if (!self.authUserPms(pms)) {
            tl.systemRes.resReject();
            return;
        }
        cb && cb();
    };
    /**
     * get user's permission
     * @returns {*}
     */
    self.getUserPms = function () {
        return tl.session.getSession('userPms');
    };
    /**
     * set user's permission
     * @param permission
     */
    self.setUserPms = function (permission) {
        permission = tl.string.splitStr(permission, ',');
        tl.session.setSession('userPms', permission);
    };
    /**
     * get user info
     * @returns {*}
     */
    self.getUserInfo = function () {
        return tl.session.getSession('userInfo');
    };
    /**
     * set user info
     * @param userInfo
     */
    self.setUserInfo = function (userInfo) {
        tl.session.setSession('userInfo', userInfo);
    };
    /**
     * register page-permissions to pagePms
     * use obj key as permission-key, and value as permission-description
     * @param aPms
     */
    self.regPagePms = function (aPms) {
        if (!tl.helper.isObj(aPms)) {
            return;
        }
        tl.object.extendObj(pagePms, aPms);
    };
    /**
     * get page-permission
     * @param [key]
     * @returns {*}
     */
    self.getPagePms = function (key) {
        if (tl.helper.isStr(key)) {
            return pagePms[key];
        }
        return pagePms;
    };
    /**
     * auth user's permission if pass
     * @param [pms]
     * @returns {boolean}
     */
    self.authUserPms = function (pms) {
        // no set pms, no need to check
        if (!pms) {
            return true;
        }
        // get user's permission
        var aUserPms = self.getUserPms();
        // user has no permissions
        if (!aUserPms) {
            return false;
        }
        // user has super admin permission
        if (aUserPms.indexOf('superAdminPms') > -1) {
            return true;
        }
        // cover the check-permission to array
        pms = tl.string.splitStr(pms, ',');
        var ret = false;
        tl.object.eachObj(pms, function (i, eachPms) {
            // user's permission include check-permission
            if (aUserPms.indexOf(eachPms) > -1) {
                ret = true;
                return false;
            }
            return true;
        });
        return ret;
    };
    return self;
})();