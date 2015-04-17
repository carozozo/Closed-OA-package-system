var lang = {};

lang.en = {
    contentFirst: function () {
        return 'Dear Sir/Madam,\r\n';
    },
    contentLast: function () {
        return 'Should you have any question, feel free to contact us at service@travelglobal.com\r\n' +
            '\r\n' +
            'Yours faithfully,\r\n' +
            'Travelglobal';
    }
};
lang.hk = {
    contentFirst: function () {
        return '您好，\r\n';
    },
    contentLast: function () {
        return '如果有什麼問題，請隨時電郵到我們郵箱 service@travelglobal.com\r\n' +
            '\r\n' +
            '謝謝，\r\n' +
            'Travelglobal';
    }
};
lang.cn = {
    contentFirst: function () {
        return '您好，\r\n';
    },
    contentLast: function () {
        return '如果有什么问题，请随时电邮到我们邮箱 service@travelglobal.com\r\n' +
            '\r\n' +
            '谢谢，\r\n' +
            'Travelglobal';
    }
};

tla.generalEmailContent = lang;