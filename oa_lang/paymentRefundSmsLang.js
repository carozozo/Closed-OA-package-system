var lang = {};

lang.en = {
    msg: function (orderNo) {
        return '[Travelglobal CS]: Your order ' + orderNo + ' cannot be confirmed';
    }
};
lang.hk = {
    msg: function (orderNo) {
        return '[游世界客服]: 您的訂單 ' + orderNo + ' 未能確認';
    }
};
lang.cn = {
    msg: function (orderNo) {
        return '您的订单 ' + orderNo + ' 未能确认';
    }
};

tla.paymentRefundSms = lang;