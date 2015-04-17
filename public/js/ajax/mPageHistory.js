$.ajax.mPageHistory = {};
$.ajax.mPageHistory.getPageHistoryByUidAJ = function (opt, cb) {
    $.ajax({
        url: '/mPageHistory/api/getPageHistoryByUid',
        data: opt,
        success: cb
    });
};
$.ajax.mPageHistory.insertPageHistoryByUidAJ = function (opt, cb) {
    $.ajax({
        url: '/mPageHistory/api/insertPageHistoryByUid',
        data: opt,
        success: cb
    });
};
$.ajax.mPageHistory.removeAllPageHistoryAJ = function (cb) {
    $.ajax({
        url: '/mPageHistory/api/removeAllPageHistory',
        data: {
        },
        success: cb
    });
};