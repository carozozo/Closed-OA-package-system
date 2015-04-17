tl.msgType = (function () {
    var self = {};
    var aMainType = [];
    var aSubType = [];
    var aStatus = ['success', 'error'];

    self.addMsgMainType = function (type) {
        if (tl.helper.isArr(type)) {
            tl.array.extendArr(aMainType, type);
        } else {
            tl.array.pushNoDup(aMainType, type);
        }
        return self.getMsgMainTypeList();
    };
    self.addMsgSubType = function (type) {
        if (tl.helper.isArr(type)) {
            tl.array.extendArr(aSubType, type);
        } else {
            tl.array.pushNoDup(aSubType, type);
        }
        return self.getMsgSubTypeList();
    };
    self.addMsgStatus = function (status) {
        if (tl.helper.isArr(status)) {
            tl.array.extendArr(aStatus, status);
        } else {
            tl.array.pushNoDup(aStatus, status);
        }
        return self.getMsgSubTypeList();
    };
    self.getMsgMainTypeList = function () {
        return aMainType;
    };
    self.getMsgSubTypeList = function () {
        return aSubType;
    };
    self.getMsgSubTypeList = function () {
        return aStatus;
    };
    return self;
})();