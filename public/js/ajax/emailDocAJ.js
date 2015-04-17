$.ajax.emailDoc = {};
$.ajax.emailDoc.sendEmailAsyncAJ = function (opt, cb) {
    $.ajax({
        url: '/emailDoc/api/sendEmail',
        async: true,
        data: opt,
        success: cb
    });
};