/**
 * The common function base on express.res (vision 4.x)
 * refer to [http://expressjs.com/4x/api.html#response]
 * @author Caro.Huang
 */
tl.response = (function () {
    var self = {};
    var sysRes = null;
    var getSystemRes = function () {
        if (!sysRes) {
            var msg = 'No express.res object';
            tl.console.logErr('tl.response', msg);
            throw msg;
        }
        return sysRes;
    };

    self.setSystemRes = function (res) {
        if (!tl.helper.isObj(res)) return;
        sysRes = res;
    };
    /**
     * get res-header
     * @param [key]
     * @returns {*}
     */
    self.getResHeader = function (key) {
        var res = getSystemRes();
        if (!key) {
            return res.headers || null;
        }
        return res.get(key);
    };
    /**
     * render-html by express.res
     * @param path
     * @param [model]
     * @param [cb]
     */
    self.renderResHtml = function (path, model, cb) {
        var res = getSystemRes();
        res.render(path, model, cb);
    };
    /**
     * send data by express.res
     * default status is 200
     * @param data
     * @param [status]
     */
    self.sendRes = function (data, status) {
        var res = getSystemRes();
        if (!tl.helper.isNum(status) && !tl.string.isInt(status)) {
            status = 200;
        }
        res.status(status).send(data);
    };
    self.getSystemRes = getSystemRes;
    return self;
})();