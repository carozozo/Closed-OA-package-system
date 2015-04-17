/**
 * The common function for system http-response
 * @author Caro.Huang
 */
tl.systemRes = (function () {
    var self = {};

    /**
     * print out the data with status by json type
     * @param [data]
     * @param status
     */
    var printJsonWithStatus = function (status, data) {
        var obj = {
            result: data
        };
        tl.object.coverUndefinedInObj(data);
        obj[status] = true;
        // {result:data,__suc:true}, {result:data,__err:true}, {result:data,__rej:true}
        tl.response.sendRes(obj);
    };

    /**
     * print out the data with status [success] by json type
     * @param [data]
     */
    self.resSuc = function (data) {
        printJsonWithStatus('__suc', data);
    };
    /**
     * print out the data with status [error] by json type
     * @param [data]
     */
    self.resErr = function (data) {
        (function updateErrorLog() {
            var userName = tl.util.getUserName();
            var now = tl.dateTime.formatNow();
            var logPath = 'route-error';
            var oLog = {
                userName: userName,
                time: now,
                error: data
            };
            oLog = tl.json.safeStringify(oLog);
            tl.logger.updateLogWithDayFileName(logPath, oLog);
        })();
        printJsonWithStatus('__err', data);
    };
    /**
     * print out the data with status [reject] by json type
     * @param [data]
     */
    self.resReject = function (data) {
        printJsonWithStatus('__rej', data);
    };
    /**
     * print out status [noUser] by json type
     */
    self.resNoUser = function () {
        printJsonWithStatus('__noUser');
    };
    return self;
})();