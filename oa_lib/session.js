/**
 * Session operator by express.session
 * refer to [https://github.com/expressjs/session]
 * @author Caro.Huang
 */
tl.session = (function () {
    var self = {};

    self.getSession = function (key) {
        var req = tl.request.getSystemReq();
        var session = req.session || {};
        try {
            if (key) {
                return  session[key];
            }
            return session;
        }
        catch (e) {
            tl.console.logErr('tl.session.getSession', e);
        }
        return null;
    };
    self.setSession = function setSession(key, val) {
        var req = tl.request.getSystemReq();
        try {
            req.session[key] = val;
        }
        catch (e) {
            tl.console.logErr('tl.session.setSession', e);
        }
    };
    self.cleanSession = function () {
        var req = tl.request.getSystemReq();
        try {
            req.session = null;
        }
        catch (e) {
            tl.console.logErr('tl.session.cleanSession', e);
        }
    };
    return self;
})();