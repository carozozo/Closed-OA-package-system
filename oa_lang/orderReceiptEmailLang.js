var lang = {};

lang.en = {
    subject: function (orderNo) {
        return 'Confirmation for order ' + orderNo;
    },
    content: function (orderNo) {
        return 'Congratulation, your order ' + orderNo + ' has been confirmed.\r\n' +
            'Please see attached official receipt for your reference and then the official electronic ticket(s) / vouchers / itinerary will be sent to you in a separate email within the next 30mins.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo) {
        return '您的預訂 ' + orderNo + ' 已確認';
    },
    content: function (orderNo) {
        return '感謝您的預訂，您的訂單 ' + orderNo + ' 已經確認，請查收附上的收據。\r\n' +
            '另外，相關的電子票/行程確認文件將會在30分鐘內有另外一個電郵。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo) {
        return '您的预订 ' + orderNo + ' 已确认';
    },
    content: function (orderNo) {
        return '感谢您的预订，您的订单 ' + orderNo + ' 已经确认，请查收附上的收据。\r\n' +
            '另外，相关的电子票/行程确认文件将会在30分钟内有另外一个电邮。\r\n';
    }
};

tla.orderReceiptEmail = lang;