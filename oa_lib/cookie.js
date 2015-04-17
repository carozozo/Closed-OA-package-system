/**
 * Cookie operator, extend by express.req (vision 4.x)
 * refer to [http://expressjs.com/4x/api.html#req.cookies]
 * @author Caro.Huang
 */

tl.cookie = (function () {
    var self = {};

    /**
     * get cookie value by key
     * @param [key]
     * @returns {*}
     */
    self.getCookie = function (key) {
        var req = tl.request.getSystemReq();
        var cookies = req.cookies;
        try {
            if (key) {
                var cookie = cookies[key];
                return tl.json.parseJson(cookie);
            }
            return cookies;
        } catch (e) {
            tl.console.logErr('tl.cookie.getCookie', e, {
                key: key
            });
            return null;
        }
    };
    /**
     * set cookie value
     * @param key
     * @param val
     * @param [opt]
     */
    self.setCookie = function (key, val, opt) {
        var res = tl.response.getSystemRes();
        try {
            val = tl.json.safeStringify(val);
            res.cookie(key, val, opt);
        } catch (e) {
            tl.console.logErr('tl.cookie.setCookie', e, {
                key: key,
                val: val
            });
        }
    };
    return self;
})();