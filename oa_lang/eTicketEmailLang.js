var lang = {};

lang.en = {
    subject: function (orderNo) {
        return 'Electronic ticket(s) / Voucher(s) / Itinerary for order ' + orderNo;
    },
    content: function (orderNo) {
        return 'Please find attached the required electronic ticket(s) / Voucher(s) / Itinerary for your order ' + orderNo + '.\r\n' +
            'Thank you for your order and we look forward to serving you again.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo) {
        return '訂單 ' + orderNo + ' 的電子票/行程確認文件';
    },
    content: function (orderNo) {
        return '現附上訂單 ' + orderNo + ' 有關的電子票/行程單，請查收\r\n' +
            '非常感謝您的預訂，希望很快能再次為您服務。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo) {
        return '订单 ' + orderNo + ' 的电子票/行程确认文件';
    },
    content: function (orderNo) {
        return '现附上订单 ' + orderNo + ' 有关的电子票/行程单，请查收。\r\n' +
            '非常感谢您的预订，希望很快能再次为您服务。\r\n';
    }
};

tla.eTicketEmail = lang;