tm.orderSms = (function () {
    tg.emitter.on('initOnStart', function () {
        tl.msgType.addMsgMainType([
            typeOrderSms
        ]);
        tl.msgType.addMsgSubType([
            typeOrderReceiptSms ,
            typePaymentConfirmedSms,
            typePaymentRejectedSms,
            typeEticketSms,
            typePaymentRefundSms,
            typeCustomerSms
        ]);
    });
    var self = {};
    var typeOrderSms = 'orderSms';
    var typeOrderReceiptSms = 'orderReceiptSms';
    var typePaymentConfirmedSms = 'paymentConfirmedSms';
    var typePaymentRejectedSms = 'paymentRejectedSms';
    var typeEticketSms = 'eTicketSms';
    var typePaymentRefundSms = 'paymentRefundSms';
    var typeCustomerSms = 'customerSms';
    var sendSmsAndCreateOrderDocRecord = function (opt) {
        var type = opt.type;
        // opt for smsDoc
        opt.mainType = typeOrderSms;
        opt.subType = type;
        // opt for orderDocument
        opt.documentType = type;
        opt.documentTarget = opt.phone;
        opt.documentDescription = opt.msg;
        var ret = tm.smsDoc.sendSmsC(opt);
        var retEtt = ret.getRetErr();
        if (retEtt) {
            opt.status = 'error';
            opt.documentDescription = retEtt;
        }
        return tm.orderDocument.createOrderDocumentC(opt);
    };

    self.getOrderReceiptSmsMsgC = function (opt) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var orderReceiptSmsLang = tla.orderReceiptSms;
        orderReceiptSmsLang = tl.language.getLangByLocaleId(orderReceiptSmsLang, localeId);
        var smsMsg = orderReceiptSmsLang.msg(orderNo);
        return tl.systemMsg.setResultSuc(smsMsg);
    };
    self.getPaymentConfirmedSmsMsgC = function (opt) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var paymentSuccessTime = opt.paymentSuccessTime;
        var paymentConfirmedSmsLang = tla.paymentConfirmedSms;
        paymentConfirmedSmsLang = tl.language.getLangByLocaleId(paymentConfirmedSmsLang, localeId);
        var smsMsg = paymentConfirmedSmsLang.msg(orderNo, paymentSuccessTime);
        return tl.systemMsg.setResultSuc(smsMsg);
    };
    self.getPaymentRejectedSmsMsgC = function (opt) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var paymentFailedTime = opt.paymentFailedTime;
        var paymentRejectedSmsLang = tla.paymentRejectedSms;
        paymentRejectedSmsLang = tl.language.getLangByLocaleId(paymentRejectedSmsLang, localeId);
        var smsMsg = paymentRejectedSmsLang.msg(orderNo, paymentFailedTime);
        return tl.systemMsg.setResultSuc(smsMsg);
    };
    self.getEticketSmsMsgC = function (opt) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var eTicketSmsLang = tla.eTicketSms;
        eTicketSmsLang = tl.language.getLangByLocaleId(eTicketSmsLang, localeId);
        var smsMsg = eTicketSmsLang.msg(orderNo);
        return tl.systemMsg.setResultSuc(smsMsg);
    };
    self.getPaymentRefundSmsMsgC = function (opt) {
        var localeId = opt.localeId;
        var orderNo = opt.orderNo;
        var paymentRefundSmsLang = tla.paymentRefundSms;
        paymentRefundSmsLang = tl.language.getLangByLocaleId(paymentRefundSmsLang, localeId);
        var smsMsg = paymentRefundSmsLang.msg(orderNo);
        return tl.systemMsg.setResultSuc(smsMsg);
    };
    self.sendOrderReceiptSmsC = function (opt) {
        // opt for msg-content: phone/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        var ret = self.getOrderReceiptSmsMsgC(opt);
        opt.msg = tl.systemMsg.getResultSuc(ret);
        opt.type = typeOrderReceiptSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    self.sendPaymentConfirmedSmsC = function (opt) {
        // opt for msg-content: phone/localeId/orderNo/paymentSuccessTime
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        var ret = self.getPaymentConfirmedSmsMsgC(opt);
        opt.msg = tl.systemMsg.getResultSuc(ret);
        opt.type = typePaymentConfirmedSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    self.sendPaymentRejectedSmsC = function (opt) {
        // opt for msg-content: phone/localeId/orderNo/paymentFailedTime
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        var ret = self.getPaymentRejectedSmsMsgC(opt);
        opt.msg = tl.systemMsg.getResultSuc(ret);
        opt.type = typePaymentRejectedSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    self.sendEticketSmsC = function (opt) {
        // opt for msg-content: phone/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        var ret = self.getEticketSmsMsgC(opt);
        opt.msg = tl.systemMsg.getResultSuc(ret);
        opt.type = typeEticketSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    self.sendFlightItinerarySmsC = function (opt) {
        return self.sendEticketSmsC(opt);
    };
    self.sendHotelVoucherSmsC = function (opt) {
        return self.sendEticketSmsC(opt);
    };
    self.sendEventVoucherSmsC = function (opt) {
        return self.sendEticketSmsC(opt);
    };
    self.sendPaymentRefundSmsC = function (opt) {
        // opt for msg-content: phone/localeId/orderNo
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        var ret = self.getPaymentRefundSmsMsgC(opt);
        opt.msg = tl.systemMsg.getResultSuc(ret);
        opt.type = typePaymentRefundSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    self.sendCustomerSmsC = function (opt) {
        // opt for sending sms: phone/msg
        // opt for orderDocument: orderId/orderTransactionId/[storeDb]
        opt.type = typeCustomerSms;
        return sendSmsAndCreateOrderDocRecord(opt);
    };
    return self;
})();