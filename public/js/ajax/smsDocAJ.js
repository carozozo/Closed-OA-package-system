$.ajax.smsDoc = {};
$.ajax.smsDoc.sendSmsAsyncAJ = function (opt, cb) {
    $.ajax({
        url: '/smsDoc/api/sendSms',
        async: true,
        data: opt,
        success: cb
    });
};