var setRequestUserInHeaders = function (headers, cb) {
    // maybe the POST is start from queue, it no userName in session and request.headers
//    var userName = tl.util.getUserName();
//    if (userName) {
//        headers[tcfg.httpRequestUserKey] = userName;
//    }
    cb({
        headers: headers
    })
};
var getApiResErr = function (res, cb) {
    var retSuc = tl.systemMsg.getResultSuc(res);
    if (!retSuc) {
        return;
    }
    (function getErrFromHK() {
        var code = retSuc.code;
        if (code) {
            cb({
                err: code
            });
        }
    })();
};

tg.emitter.on('initOnConfig', function (nconf) {
});
tg.emitter.on('initOnStart', function (app) {
});
tg.emitter.on('initBeforeRoute', function (req, res) {
});
tg.emitter.on('aftGetSync', function (res, cb) {
    getApiResErr(res, cb);
});
tg.emitter.on('befPostSync', function (url, headers, oForm, cb) {
    setRequestUserInHeaders(headers, cb);
});
tg.emitter.on('aftPostSync', function (res, cb) {
    getApiResErr(res, cb);
});
tg.emitter.on('befPutSync', function (url, headers, oForm, cb) {
    setRequestUserInHeaders(headers, cb);
});
tg.emitter.on('aftPutSync', function (res, cb) {
    getApiResErr(res, cb);
});