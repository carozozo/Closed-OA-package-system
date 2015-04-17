tm.pkgMsgRecord = (function () {
    var self = {};
    var pkgMsgRecordApi = tapi.pkgMsgRecord;
    var aMainType = null;
    var aSubType = null;
    var aStatus = null;
    var getOptErr = function (opt) {
        var aErr = [];
        aMainType = aMainType || tl.msgType.getMsgMainTypeList();
        aSubType = aSubType || tl.msgType.getMsgSubTypeList();
        aStatus = aStatus || tl.msgType.getMsgSubTypeList();
        var status = opt.status;
        var mainType = opt.mainType;
        var subType = opt.subType;
        // mainType not in aMainType
        if (!mainType || aMainType.indexOf(mainType) < 0) {
            aErr.push('MainType error: ' + mainType);
        }
        // has subType but not in aSubType (subType can be empty)
        if (subType && aSubType.indexOf(subType) < 0) {
            aErr.push('SubType error: ' + subType);
        }
        // has status but not in aStatus (status can be empty,will cover to success in module)
        if (status && aStatus.indexOf(status) < 0) {
            aErr.push('Status [' + opt.status + '] not allowed');
        }
        return aErr.join('');
    };

    self.getPkgMsgMainTypeListC = function () {
        aMainType = tl.msgType.getMsgMainTypeList();
        return tl.systemMsg.setResultSuc(aMainType);
    };
    self.getPkgMsgSubTypeListC = function () {
        aSubType = tl.msgType.getMsgSubTypeList();
        return tl.systemMsg.setResultSuc(aSubType);
    };
    self.getPkgMsgStatusListC = function () {
        aStatus = tl.msgType.getMsgSubTypeList();
        return tl.systemMsg.setResultSuc(aStatus);
    };
    self.getPkgMsgRecordListC = function (opt) {
        var oPkgMsgRecord = new pkgMsgRecordApi(opt);
        oPkgMsgRecord.getPkgMsgRecordListApi();
        return oPkgMsgRecord.getRetObj();
    };
    self.createPkgMsgRecordC = function (opt) {
        var err = getOptErr(opt);
        if (err) {
            return tl.systemMsg.setResultErr();
        }
        var oPkgMsgRecord = new pkgMsgRecordApi(opt);
        oPkgMsgRecord.createPkgMsgRecordApi();
        return oPkgMsgRecord.getRetObj();
    };
    // TODO no used
    self.updatePkgMsgRecordC = function (opt) {
        var err = getOptErr(opt);
        if (err) {
            return tl.systemMsg.setResultErr();
        }
        var oPkgMsgRecord = new pkgMsgRecordApi(opt);
        oPkgMsgRecord.updatePkgMsgRecordApi();
        return oPkgMsgRecord.getRetObj();
    };
    return self;
})();