var lang = {};

lang.en = {
    subject: function (orderNo, paymentFailedTime) {
        return 'Your payment for order ' + orderNo + ', was declined at ' + paymentFailedTime;
    },
    content: function (orderNo, paymentFailedTime, paymentDeadline) {
        return 'Regret to advise that we noticed a failed payment attempt for order ' + orderNo + '.\r\n' +
            'You can logon www.travelglobal.com and retrieve this order for re-payment.\r\n' +
            'Please be reminded that payment due date for this order is ' + paymentDeadline + ', you are encouraged to complete payment as soon as you can as supplier(s) reserves the right to cancel your reservation without any prior notice.\r\n' +
            'Once we receive a payment confirmation for this order, we shall send you an email confirmation together with the official electronic ticket(s) / vouchers / itinerary.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo, paymentFailedTime) {
        return '您在 ' + paymentFailedTime + ' 為訂單 ' + orderNo + ' 的支付未能確認';
    },
    content: function (orderNo, paymentFailedTime, paymentDeadline) {
        return '很抱歉的通知您，您在 ' + paymentFailedTime + ' 為訂單 ' + orderNo + ' 的支付不被接納，敬請登錄網站，提出此訂單再次進行支付。\r\n' +
            '請注意，此訂單的最後支付日期為 ' + paymentDeadline + '，在沒有支付完成的期間，相關供應商有權在不通知的情況下取消此預訂，敬請儘快支付已完成此預訂。\r\n' +
            '待支付確認後有關的電子票/行程確認文件將會發送到您的郵箱。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo, paymentFailedTime) {
        return '您在 ' + paymentFailedTime + ' 为订单 ' + orderNo + ' 的支付未能确认';
    },
    content: function (orderNo, paymentFailedTime, paymentDeadline) {
        return '很抱歉的通知您，您在 ' + paymentFailedTime + ' 为订单 ' + orderNo + ' 的支付不被接纳，敬请登录网站，提出此订单再次进行支付。\r\n' +
            '请注意，此订单的最后支付日期为 ' + paymentDeadline + '，在没有支付完成的期间，相关供应商有权在不通知的情况下取消此预订，敬请尽快支付已完成此预订。\r\n' +
            '待支付确认后有关的电子票/行程确认文件将会发送到您的邮箱。\r\n';
    }
};

tla.paymentRejectedEmail = lang;