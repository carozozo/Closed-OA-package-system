var lang = {};

lang.en = {
    msg: function (orderNo) {
        return '[Travelglobal CS]: We have emailed you the required e ticket(s) / voucher(s) / itinerary for order ' + orderNo;
    }
};
lang.hk = {
    msg: function (orderNo) {
        return '[游世界客服]: 訂單 ' + orderNo + ' 的電子票/行程單已發送到您的郵箱，請查收';
    }
};
lang.cn = {
    msg: function (orderNo) {
        return '[游世界客服]: 订单 ' + orderNo + ' 的电子票/行程单已发送到您的邮箱，请查收';
    }
};

tla.eTicketSms = lang;