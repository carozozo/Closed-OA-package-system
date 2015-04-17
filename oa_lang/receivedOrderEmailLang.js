// TODO no used
var lang = {};

lang.en = {
    subject: function (orderNo, paymentDeadline) {
        return 'We have received your order ' + orderNo + ', payment due date is ' + paymentDeadline;
    },
    content: function (orderNo, paymentDeadline) {
        return 'Congratulation, order ' + orderNo + ' has been reserved successfully.\r\n' +
            'Please be reminded that payment due date for this order' + paymentDeadline + ', you are encouraged to complete payment as soon as you can as supplier(s) reserves the right to cancel your reservation without any prior notice.\r\n' +
            'Once we receive a payment confirmation for this order, we shall send you an email confirmation together with the official electronic ticket(s) / voucher(s) / itinerary.\r\n';
    }
};
lang.hk = {
    subject: function (orderNo, paymentDeadline) {
        return '您的預訂 ' + orderNo + ' 已保留，最後支付期限為 ' + paymentDeadline;
    },
    content: function (orderNo, paymentDeadline) {
        return '感謝您的預訂，訂單 ' + orderNo + ' 已經保留好，此訂單的最後支付日期為' + paymentDeadline + '\r\n' +
            '請注意，在沒有支付完成的期間，相關供應商有權在不通知的情況下取消此預訂，敬請儘快支付已完成此預訂。\r\n' +
            '待支付確認後有關的電子票/行程確認文件將會發送到您的郵箱。\r\n';
    }
};
lang.cn = {
    subject: function (orderNo, paymentDeadline) {
        return '您的预订 ' + orderNo + ' 已保留，最后支付期限为 ' + paymentDeadline;
    },
    content: function (orderNo, paymentDeadline) {
        return '感谢您的预订，订单 ' + orderNo + ' 已经保留好，此订单的最后支付日期为' + paymentDeadline + '\r\n' +
            '请注意，在没有支付完成的期间，相关供应商有权在不通知的情况下取消此预订，敬请尽快支付已完成此预订。\r\n' +
            '待支付确认后有关的电子票/行程确认文件将会发送到您的邮箱。\r\n';
    }
};

tla.receivedOrderEmail = lang;