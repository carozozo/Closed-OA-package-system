var lang = {};

lang.en = {
    msg: function (orderNo, paymentDeadline) {
        return '[Travelglobal CS]: We have received your order ' + orderNo + ', payment due date is ' + paymentDeadline;
    }
};
lang.hk = {
    msg: function (orderNo, paymentDeadline) {
        return '[游世界客服]: 已收到您的預訂 ' + orderNo + ', 支付期限為 ' + paymentDeadline;
    }
};
lang.cn = {
    msg: function (orderNo, paymentDeadline) {
        return '[游世界客服]： 已收到您的预订 ' + orderNo + ', 支付期限为 ' + paymentDeadline;
    }
};

tla.receivedOrderSms = lang;