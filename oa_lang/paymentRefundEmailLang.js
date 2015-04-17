var lang = {};

lang.en = {
    subject: function (orderNo) {
        return 'Your order ' + orderNo + 'cannot be confirmed by supplier(s)';
    },
    content: function (orderNo) {
        return 'Regret to advise that supplier(s) cannot confirm your order ' + orderNo + ' and the order was cancelled. We shall arrange full refund to you as soon as possible.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo) {
        return '您的訂單 ' + orderNo + ' 未能確認';
    },
    content: function (orderNo) {
        return '很抱歉的通知您，您的訂單 ' + orderNo + ' 未能收到供應商的確認，並已經取消。我們會馬上安排全額退款。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo) {
        return '您的订单 ' + orderNo + ' 未能确认';
    },
    content: function (orderNo) {
        return '很抱歉的通知您，您的订单 ' + orderNo + ' 未能收到供应商的确认，并已经取消，我们会马上安排全额退款。\r\n';
    }
};

tla.paymentRefundEmail = lang;