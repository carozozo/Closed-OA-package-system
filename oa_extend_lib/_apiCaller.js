/**
 * The extend lib for tl.apiCaller
 * @author Caro.Huang
 */
tl.apiCaller = (function () {
    var self = tl.apiCaller;

    /**
     * convenience formatting startPage & pageSize
     * OPT
     * useClone: if use cloned obj for not replacing original obj
     * useSimpleKey: obj.startPage => obj.page, obj.pageSize => obj.size
     * @param obj
     * @param [opt]
     * @returns {{}}
     */
    self.formatStartPagePageSize = function (obj, opt) {
        var objRet = obj;
        var useClone = false;
        var useSimpleKey = false;
        if (opt) {
            useClone = opt.useClone === true;
            useSimpleKey = opt.useSimpleKey === true;
        }
        if (useClone) {
            objRet = tl.object.cloneObj(obj);
        }
        objRet.startPage = (objRet.startPage) ? parseInt(objRet.startPage, 10) : 0;
        objRet.pageSize = (objRet.pageSize) ? parseInt(objRet.pageSize, 10) : 10;
        if (useSimpleKey) {
            tl.object.replaceObjKeys(objRet, [
                ['startPage', 'page'],
                ['pageSize', 'size']
            ]);
        }
        return objRet;
    };
    /**
     * convenience formatting sort & sortDir
     * OPT
     * useClone: if use cloned obj for not replacing original obj
     *
     * EX
     * var obj = {sort:'name', sortDir:'desc'}
     * object.combineSortAndSortDirKey(obj);
     * => obj = {sort:'name,DESC'}
     * @param obj
     * @param [opt]
     * @returns {{}}
     */
    self.combineSortAndSortDirKey = function (obj, opt) {
        var objRet = obj;
        var useClone = false;
        if (opt) {
            useClone = opt.useClone === true;
        }
        if (useClone) {
            objRet = object.cloneObj(obj);
        }
        objRet.sort = (objRet.sort) ? (objRet.sort + (objRet.sortDir ? ',' + objRet.sortDir.toUpperCase() : '')) : '';
        delete objRet.sortDir;
        return objRet;
    };
    return self;
})();