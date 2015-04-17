var lang = {};

lang.en = {
    msg: function (orderNo) {
        return '[Travelglobal CS]: Your order ' + orderNo + ' has been confirmed';
    }
};
lang.hk = {
    msg: function (orderNo) {
        return '[游世界客服]：您的預訂 ' + orderNo + ' 已確認';
    }
};
lang.cn = {
    msg: function (orderNo) {
        return '[游世界客服]：您的预订 ' + orderNo + ' 已确认';
    }
};

tla.orderReceiptSms = lang;