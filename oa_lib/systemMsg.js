tl.systemMsg = (function () {
    var self = {};
    var errKey = 'tgErr';
    var sucKey = 'tgSuc';
    /**
     * @param err
     * @param [suc]
     * @returns {{}}
     */
    var coverToSysResult = function (err, suc) {
        var obj = {};
        obj[errKey] = err;
        obj[sucKey] = suc;
        return obj;
    };
    var validateResult = function (fnName, ret) {
        if (ret[errKey] === undefined && ret[sucKey] === undefined) {
            throw 'tl.systemMsg.' + fnName + ' error: No ' + errKey + '/' + sucKey + ' in result';
        }
    };
    /**
     * unify the result-object, only set suc if err exists
     * EX. setResult(true, 'aaa');
     * => return {tgErr: true, tgSuc: undefined}
     * @param err
     * @param [suc]
     * @returns {{tgErr: *, tgSuc: *}}
     */
    self.setResult = function (err, suc) {
        if (err) {
            return coverToSysResult(err);
        }
        return coverToSysResult(err, suc);
    };
    /**
     * set error and return result-object
     * @param [err]
     * @returns {{}}
     */
    self.setResultErr = function (err) {
        err = err || true;
        return coverToSysResult(err);
    };
    /**
     * set success and return result-object
     * @param [suc]
     * @returns {{}}
     */
    self.setResultSuc = function (suc) {
        suc = suc || true;
        return coverToSysResult(false, suc);
    };
    /**
     * get error from result-object
     * @param ret
     * @returns {*}
     */
    self.getResultErr = function (ret) {
        validateResult('getResultErr', ret);
        return ret[errKey];
    };
    /**
     * get success from result-object
     * @param ret
     * @returns {*}
     */
    self.getResultSuc = function (ret) {
        validateResult('getResultSuc', ret);
        return ret[sucKey];
    };
    /**
     * print result by http-response
     * @param ret
     */
    self.printHttpResult = function (ret) {
        validateResult('printHttpResult', ret);
        var err = ret[errKey];
        var suc = ret[sucKey];
        if (err) {
            tl.systemRes.resErr(err);
            return;
        }
        tl.systemRes.resSuc(suc);
    };
    self.extendRetObj = function (obj, err, suc) {
        var retErr = err || null;
        var retSuc = suc || null;

        obj.getRetObj = function () {
            obj[errKey] = retErr;
            obj[sucKey] = retSuc;
            return obj;
        };
        obj.setRet = function (err, suc) {
            if (!err) {
                retSuc = suc;
            }
            retErr = err;
            return obj.getRetObj();
        };
        obj.getRetErr = function () {
            return retErr;
        };
        obj.setRetErr = function (err) {
            retErr = err;
            return obj.getRetObj();
        };
        obj.getRetSuc = function () {
            return retSuc;
        };
        obj.setRetSuc = function (suc) {
            retSuc = suc;
            return obj.getRetObj();
        };
        obj.transferRet = function (ret) {
            validateResult('transferRet', ret);
            var err = ret[errKey];
            var suc = ret[sucKey];
            if (!err) {
                retSuc = suc;
            } else {
                retSuc = null;
            }
            retErr = err;
        };
        return obj;
    };
    return self;
})();