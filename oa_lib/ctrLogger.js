/**
 * The operator with oa-controller-log
 * @author Caro.Huang
 */
tl.ctrLogger = (function () {
    var self = {};
    var aExcludeUrl = [];
    /**
     * update controller-log
     * @param logName
     * @param oLog
     */
    var updateCtrLog = function (logName, oLog) {
        if (!oLog.userName) {
            return;
        }
        var url = oLog.url;
        // the url not-log
        if (aExcludeUrl.indexOf(url) > -1) {
            return;
        }
        tl.logger.updateLogWithDayFileName(logName, oLog);
    };
    var getLogObj = function (req) {
        var userName = tl.util.getUserName();
        var startTime = req._startTime.toString();
        var remoteAddress = req._remoteAddress;
        var url = req.url;
        var method = req.method;
        return {
            startTime: startTime,
            remoteAddress: remoteAddress,
            method: method,
            userName: userName,
            url: url
        };
    };
    /**
     * update user-controller-log by specified user
     */
    self.updateUserCtrLog = function (req) {
        var oLog = getLogObj(req);
        var userName = oLog.userName;
        var logName = 'ctr-' + userName;
        updateCtrLog('ctr-index', oLog);
        updateCtrLog(logName, oLog);
    };
    /**
     * add the url-path that won't to be logged
     * @param url
     */
    self.addExcludeUrl = function (url) {
        tl.array.pushNoDup(aExcludeUrl, url);
    };
    return self;
})();