var lang = {};

lang.en = {
    msg: function (orderNo, paymentSuccessTime) {
        return '[Travelglobal CS]: We have received your payment for order ' + orderNo + ' at ' + paymentSuccessTime;
    }
};

lang.hk = {
    msg: function (orderNo, paymentSuccessTime) {
        return '[游世界客服]: 您在 ' + paymentSuccessTime + ' 為訂單' + orderNo + ' 的支付已確認';
    }
};

lang.cn = {
    msg: function (orderNo, paymentSuccessTime) {
        return '[游世界客服]： 您在 ' + paymentSuccessTime + ' 为订单' + orderNo + ' 的支付已确认';
    }
};

tla.paymentConfirmedSms = lang;