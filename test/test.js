var base = require('../base');
base.requireFiles(false);

//tm.orderEmail.getEventVoucherEmailCbC({
//    localeId: 'en',
//    orderNo: '222222',
//    eventCategory: 'transport',
//    eventSubCategories: ['ferry']
//}, function (ret) {
//    tl.console.log2('ret=', ret);
//});

var ret = tm.orderDocument.getOrderDocumentListC({
    pageSize: 10000
});
//tl.console.log2('ret=', ret);
var result = ret.getRetSuc();
var list = result.results;
var update = function (opt) {
    tm.orderDocument.updateOrderDocumentC(opt);
};
tl.object.eachObj(list, function (i, orderDoc) {
    orderDoc.tgReqUser = 'caro';
    var documentType = orderDoc.documentType;
    if (documentType === 'testType2') {
        orderDoc.documentType = 'testType';
        update(orderDoc);
    }
    if (documentType === 'receiptEmail') {
        orderDoc.documentType = 'orderReceiptEmail';
        update(orderDoc);
    }
    if (documentType === 'eTickEmail') {
        orderDoc.documentType = 'eTicketEmail';
        update(orderDoc);
    }
});