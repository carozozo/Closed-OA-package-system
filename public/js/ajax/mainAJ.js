$.ajax.main = {};
$.ajax.main.getVarsAJ = function (cb) {
    $.ajax({
        url: '/main/api/getVars',
        data: {
        },
        success: cb
    });
};
$.ajax.main.loginAJ = function (opt, cb) {
    $.ajax({
        url: '/main/api/login',
        data: opt,
        success: cb
    });
};
$.ajax.main.logoutAJ = function (cb) {
    $.ajax({
        url: '/main/api/logout',
        data: {
        },
        success: cb
    });
};
$.ajax.main.authPwdAJ = function (opt, cb) {
    $.ajax({
        url: '/main/api/authPwd',
        data: opt,
        success: cb
    });
};
$.ajax.main.getPageAJ = function (opt, cb) {
    $.ajax({
        url: '/main/api/getPage',
        data: opt,
        success: cb
    });
};
$.ajax.main.getPageAsyncAJ = function (opt, cb) {
    $.ajax({
        url: '/main/api/getPage',
        async: true,
        data: opt,
        success: cb
    });
};
$.ajax.main.ifFileExistsAJ = function (opt, cb) {
    $.ajax({
        url: '/main/api/ifFileExists',
        async: true,
        data: opt,
        success: cb
    });
};