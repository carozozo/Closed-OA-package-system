tapi.orderDocument = function (data) {
    var self = tl.systemMsg.extendRetObj({});
    var apiCaller = tl.apiCaller;
    var oaUrl = tcfg.apiUrl.oaUrl;
    var apiUrl = {
        getDocumentList: function () {
            // startPage/pageSize/sort/sortDir/status/orderId/orderTransactionId
            // documentTypeLike/uid
            var url = oaUrl + 'orderDocument';
            tl.apiCaller.formatStartPagePageSize(data);
            data.sortDir = (data.sortDir) ? data.sortDir.toUpperCase() : '';
            return tl.string.serializeUrl(url, data);
        },
        createDocument: function () {
            return oaUrl + 'orderDocument';
        },
        updateDocument: function () {
            return  oaUrl + 'orderDocument';
        }
    };
    var apiModel = {
        createDocument: function () {
            var obj = {};
            var userName = data.tgReqUser || tl.util.getUserName() || data.recordCreatedBy;
            // uid is no used so far
            obj.uid = tl.string.trimStr(data.uid) || '';
            obj.orderId = data.orderId;
            obj.orderTransactionId = data.orderTransactionId;
            obj.status = tl.string.trimStr(data.status) || 'success';
            obj.documentType = tl.string.trimStr(data.documentType) || '';
            obj.documentTarget = tl.string.trimStr(data.documentTarget) || '';
            obj.documentDescription = tl.string.trimStr(data.documentDescription) || '';
            // file is no used so far
            obj.file = (data.file) ? tl.json.safeStringify(data.file) : null;
            obj.recordCreatedBy = userName;
            obj.recordUpdatedBy = userName;
            return obj;
        },
        updateDocument: function () {
            var obj = {};
            obj.documentId = data.documentId;
            // uid is no used so far
            obj.uid = tl.string.trimStr(data.uid) || '';
            obj.orderId = data.orderId;
            obj.orderTransactionId = data.orderTransactionId;
            obj.status = tl.string.trimStr(data.status) || null;
            obj.documentType = tl.string.trimStr(data.documentType) || '';
            obj.documentTarget = tl.string.trimStr(data.documentTarget) || '';
            obj.documentDescription = tl.string.trimStr(data.documentDescription) || '';
            // file is no used so far
            obj.file = (data.file) ? tl.json.safeStringify(data.file) : null;
            obj.recordUpdatedBy =  data.tgReqUser || tl.util.getUserName();
            return obj;
        }
    };

    self.getOrderDocumentListApi = function () {
        var url = apiUrl.getDocumentList();
        var res = apiCaller.getSync(url);
        self.transferRet(res);
    };
    self.createOrderDocumentApi = function () {
        var url = apiUrl.createDocument();
        var m = apiModel.createDocument();
        var res = apiCaller.postSync(url, m);
        self.transferRet(res);
    };
    self.updateOrderDocumentApi = function () {
        var url = apiUrl.updateDocument();
        var m = apiModel.updateDocument();
        var res = apiCaller.putSync(url, m);
        self.transferRet(res);
    };
    return self;
};