tm.orderDocument = (function(){
    var self = {};
    var orderDocumentApi = tapi.orderDocument;

    self.getOrderDocumentListC = function (opt) {
        var oOrderDocument = new orderDocumentApi(opt);
        oOrderDocument.getOrderDocumentListApi();
        return oOrderDocument.getRetObj();
    };
    self.createOrderDocumentC = function (opt) {
        var oOrderDocument = new orderDocumentApi(opt);
        oOrderDocument.createOrderDocumentApi();
        return oOrderDocument.getRetObj();
    };
    self.updateOrderDocumentC = function (opt) {
        var oOrderDocument = new orderDocumentApi(opt);
        oOrderDocument.updateOrderDocumentApi();
        return oOrderDocument.getRetObj();
    };
    return self;
})();