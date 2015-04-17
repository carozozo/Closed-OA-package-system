var lang = {};

lang.en = {
    subject: function (orderNo) {
        return 'Payment confirmation for order ' + orderNo;
    },
    content: function (orderNo) {
        return 'Thank you, we have received your payment for order ' + orderNo + '.\r\n' +
            'We are in the process to have your order confirmed by the corresponding supplier(s), once confirmed, we shall send you an email confirmation together with the official electronic ticket / voucher / itinerary.\r\n' +
            'On the other hand, in case we cannot get a confirmation within the next 2 hours, please be assured that we shall arrange a full refund to you.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo) {
        return '您為訂單 ' + orderNo + ' 的支付已確認';
    },
    content: function (orderNo) {
        return '感謝您的預訂，有關訂單 ' + orderNo + ' 的支付已經收妥，我們正在與有關的供應商進行確認，待確認後相關的電子票/行程確認文件將會發送到您的郵箱。\r\n' +
            '萬一我們在兩個小時內都不能得到供應商的確認，請放心，我們會馬上安排全數退款。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo) {
        return '您為訂單 ' + orderNo + ' 的支付已確認';
    },
    content: function (orderNo) {
        return '感谢您的预订，有关订单 ' + orderNo + ' 的支付已经收妥，我们正在与有关的供应商进行确认，待确认后相关的电子票/行程确认文件将会发送到您的邮箱。\r\n' +
            '万一我们在两个小时内都不能得到供应商的确认，请放心，我们会马上安排全数退款。\r\n';
    }
};

tla.paymentConfirmedEmail = lang;