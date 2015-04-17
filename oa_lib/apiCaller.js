/**
 * The operator that call api and receive data
 * node.request wil return [connection err, response, body]
 * @author Caro.Huang
 */
tl.apiCaller = (function () {
    var self = {};
    var getConnectErrorMsg = function () {
        return tl.systemMsg.setResultErr('API_CONNECT_ERROR');
    };
//    var getDefHeaders = function () {
//        return {
//            'Content-Type': 'application/json'
//        };
//    };
    var getHeaders = function (oForm) {
        var headers = {};
        var sForm = tl.json.safeStringify(oForm);
        if (!sForm) {
            return headers;
        }
        // Note: DO NOT use sForm.length, because will cause exception when sForm is big
        headers['Content-Length'] = Buffer.byteLength(sForm);
        return headers;
    };
    var parseApiCallerRes = function (res) {
        var body = res.getBody('utf8');
        body = tl.helper.coverToObj(body, {
            force: false
        });
        return tl.systemMsg.setResultSuc(body);
    };
    /**
     * trace api by console.log(only work in dev-server)
     * @param method
     * @param url
     */
    var traceApi = function (method, url) {
        // get fn name with 3 to get who called apiCaller[getSync/postSync/putSync]
        var msg = method + '-API\r\nURL: ' + url;
        tl.console.log(msg);
    };
    /**
     * request by sync
     * @param methodType
     * @param url
     * @param oForm
     * @param [opt]
     * @returns {*}
     */
    var syncRequest = function (methodType, url, oForm, opt) {
        // ex. methodType='Get', method='GET'
        var method = tl.string.upperStr(methodType);
        var ifTrim = true;
        if (opt) {
            ifTrim = opt.ifTrim !== false;
        }
        if (ifTrim) {
            oForm = tl.object.trimObjVal(oForm);
        }
        var headers = getHeaders(oForm);
        tg.emitter.emit('bef' + methodType + 'Sync', url, headers, oForm, function (ret) {
            var retUrl = tl.helper.isStr(ret.url) ? ret.url : null;
            var retHeaders = tl.helper.isObj(ret.headers) ? ret.headers : null;
            var retForm = tl.helper.isObj(ret.form) ? ret.form : null;
            if (retUrl) {
                url = retUrl;
            }
            if (retHeaders) {
                headers = retHeaders;
            }
            if (retForm) {
                oForm = retForm;
            }
        });
        traceApi(method, url);
        try {
            // https://www.npmjs.com/package/sync-request
            var syncReq = require('sync-request');
            var reqOpt = (function () {
                var opt = {};
                if (headers) opt.headers = headers;
                if (oForm) opt.json = oForm;
                return opt;
            })();
            var res = syncReq(method, url, reqOpt);
            res = parseApiCallerRes(res);
            tg.emitter.emit('aft' + methodType + 'Sync', res, function (ret) {
                var retErr = (ret.err !== undefined) ? ret.err : null;
                var retRes = (ret.res !== undefined) ? ret.res : null;
                res = tl.systemMsg.setResult(retErr, retRes);
            });
            return res;
        } catch (e) {
            tl.console.logErr('tl.apiCaller', e, {
                method: method,
                url: url,
                oForm: oForm
            });
            return getConnectErrorMsg();
        }
    };

    /**
     * get-request by sync
     * @param url
     * @param [oForm]
     * @param [opt]
     * @returns {*}
     */
    self.getSync = function (url, oForm, opt) {
        return syncRequest('Get', url, oForm, opt);
    };
    /**
     * post-request by sync
     * @param url
     * @param oForm
     * @param [opt]
     * @returns {*}
     */
    self.postSync = function (url, oForm, opt) {
        return syncRequest('Post', url, oForm, opt);
    };
    /**
     * put-request by sync
     * @param url
     * @param oForm
     * @param [opt]
     * @returns {*}
     */
    self.putSync = function (url, oForm, opt) {
        return syncRequest('Put', url, oForm, opt);
    };
    return self;
})();