tapi.pkgMsgRecord = function (data) {
    var self = tl.systemMsg.extendRetObj({});
    var apiCaller = tl.apiCaller;
    var oaUrl = tcfg.apiUrl.oaUrl;
    var apiUrl = {
        getPkgMsgRecordList: function () {
            // startPage/pageSize/sort/sortDir/status/mainType/subType/msgFrom/msgTo/subject/content
            var url = oaUrl + 'pkgMsgRecord';
            tl.apiCaller.formatStartPagePageSize(data);
            return  tl.string.serializeUrl(url, data);
        },
        createPkgMsgRecord: function () {
            return oaUrl + 'pkgMsgRecord';
        },
        updatePkgMsgRecord: function () {
            return oaUrl + 'pkgMsgRecord';
        }
    };
    var apiModel = {
        createPkgMsgRecord: function () {
            var obj = {};
            var userName = tl.util.getUserName();
            obj.mainType = tl.string.trimStr(data.mainType) || '';
            obj.subType = tl.string.trimStr(data.subType) || '';
            obj.status = tl.string.trimStr(data.status) || 'success';
            obj.msgFrom = tl.string.trimStr(data.msgFrom) || '';
            obj.msgTo = tl.string.trimStr(data.msgTo) || '';
            obj.subject = tl.string.trimStr(data.subject) || '';
            obj.content = tl.string.trimStr(data.content) || '';
            obj.extendData = (data.extendData) ? tl.json.safeStringify(data.extendData) : '';
            obj.recordCreatedBy = userName;
            obj.recordUpdatedBy = userName;
            return obj;
        },
        updatePkgMsgRecord: function () {
            var obj = {};
            obj.recordId = data.recordId;
            obj.mainType = tl.string.trimStr(data.mainType) || '';
            obj.subType = tl.string.trimStr(data.subType) || '';
            obj.status = tl.string.trimStr(data.status) || 'success';
            obj.msgFrom = tl.string.trimStr(data.msgFrom) || '';
            obj.msgTo = tl.string.trimStr(data.msgTo) || '';
            obj.subject = tl.string.trimStr(data.subject) || '';
            obj.content = tl.string.trimStr(data.content) || '';
            obj.extendData = (data.extendData) ? tl.json.safeStringify(data.extendData) : '';
            obj.recordUpdatedBy = tl.util.getUserName();
            return obj;
        }
    };

    self.getPkgMsgRecordListApi = function () {
        var url = apiUrl.getPkgMsgRecordList();
        var res = apiCaller.getSync(url);
        self.transferRet(res);
    };
    self.createPkgMsgRecordApi = function () {
        var url = apiUrl.createPkgMsgRecord();
        var m = apiModel.createPkgMsgRecord();
        var res = apiCaller.postSync(url, m);
        self.transferRet(res);
    };
    // TODO no used
    self.updatePkgMsgRecordApi = function () {
        var url = apiUrl.updatePkgMsgRecord();
        var m = apiModel.updatePkgMsgRecord();
        var res = apiCaller.putSync(url, m);
        self.transferRet(res);
    };
    return self;
};