/**
 * The extend lib for tl.session
 * @author Caro.Huang
 */
tl.session = (function () {
    var self = tl.session;

    self.cleanSession = function (cb) {
        var req = tl.request.getSystemReq();
        try {
            // use [req.session.destroy] for Redis, etc based sessions
            req.session.destroy(function () {
                tl.helper.executeIfFn(cb);
            });
        }
        catch (e) {
            tl.console.logErr('tl.session.cleanSession', e);
        }
    };
    return self;
})();