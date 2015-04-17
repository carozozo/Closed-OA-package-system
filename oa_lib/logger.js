/**
 * The operator with log file
 * @author Caro.Huang
 */
tl.logger = (function () {
    var self = {};
    var normalizeLogPath = function (logPath) {
        logPath = tl.files.normalizePath(logPath);
        logPath = tl.string.addHead(logPath, tg.logDirFull);
        return tl.string.addTail(logPath, '.log');
    };

    /**
     * read log-file ,and create it if not exists
     * @param logPath
     * @returns {*}
     */
    self.readLog = function (logPath) {
        logPath = normalizeLogPath(logPath);
        try {
            if (!tl.files.ifFileExists(logPath)) {
                return null;
            }
            return tl.files.readFile(logPath);
        } catch (e) {
            tl.console.logErr('tl.logger.readLog', e);
            return null;
        }
    };
    /**
     * write log-file with data
     * create empty-file if data is empty
     * @param logPath
     * @param [data]
     * @returns {*}
     */
    self.writeLog = function (logPath, data) {
        data = data || '';
        logPath = normalizeLogPath(logPath);
        try {
            var size = tl.files.getFileSizeInMegabytes(logPath);
            if (size > 1) {
                tl.console.logErr('tl.logger.writeLog', logPath + ' size ' + size + ' is more thane 1 mb');
                return;
            }
            data = tl.json.safeStringify(data, null, 2);
            tl.files.writeFile(logPath, data);
        } catch (e) {
            tl.console.logErr('tl.logger.writeLog', e);
        }
    };
    /**
     * update log data
     * OPT
     * ifWrap: str (default: true) - add wrap with add-data
     *
     * @param logPath
     * @param data
     * @param [opt]
     */
    self.updateLog = function (logPath, data, opt) {
        var originData = tl.logger.readLog(logPath);
        var wrap = '\r\n';
        var ifWrap = true;
        var prepend = false;
        if (opt) {
            ifWrap = opt.ifWrap !== false;
            prepend = opt.prepend === true;
        }
        originData = originData || '';
        data = tl.json.safeStringify(data, null, 2);
        if (originData && ifWrap) {
            if (prepend) {
                data += wrap;
            }
            else {
                originData += wrap;
            }
        }
        if (prepend) {
            data += originData;
        }
        else {
            data = originData + data;
        }
        tl.logger.writeLog(logPath, data);
    };
    self.updateLogWithDayFileName = function (logPath, data, opt) {
        var today = tl.dateTime.formatNow('YYYYMMDD');
        logPath = tl.string.addTail(logPath, '_' + today);
        self.updateLog(logPath, data, opt);
    };
    /**
     * convenient-logger to [trace.log]
     * @param data
     * @param [opt]
     */
    self.traceLog = function (data, opt) {
        var logPath = 'trace';
        self.updateLog(logPath, data, opt);
    };
    return self;
})();