var lang = {};

lang.en = {
    msg: function (orderNo, paymentFailedTime) {
        return '[Travelglobal CS]: Your payment for order ' + orderNo + ', was declined at ' + paymentFailedTime;
    }
};
lang.hk = {
    msg: function (orderNo, paymentFailedTime) {
        return '[游世界客服]: 您在 ' + paymentFailedTime + ' 為訂單 ' + orderNo + ' 的支付未能確認';
    }
};
lang.cn = {
    msg: function (orderNo, paymentFailedTime) {
        return '[游世界客服]： 您在 ' + paymentFailedTime + ' 为订单 ' + orderNo + ' 的支付未能确认';
    }
};

tla.paymentRejectedSms = lang;