$.ajax.pkgMsgRecord = {};
$.ajax.pkgMsgRecord.getPkgMsgMainTypeListAJ = function (cb) {
    $.ajax({
        url: '/pkgMsgRecord/api/getPkgMsgMainTypeList',
        data: {},
        success: cb
    });
};
$.ajax.pkgMsgRecord.getPkgMsgSubTypeListAJ = function (cb) {
    $.ajax({
        url: '/pkgMsgRecord/api/getPkgMsgSubTypeList',
        data: {},
        success: cb
    });
};
$.ajax.pkgMsgRecord.getPkgMsgStatusListAJ = function (cb) {
    $.ajax({
        url: '/pkgMsgRecord/api/getPkgMsgStatusList',
        data: {},
        success: cb
    });
};
$.ajax.pkgMsgRecord.getPkgMsgRecordListAJ = function (opt, cb) {
    $.ajax({
        url: '/pkgMsgRecord/api/getPkgMsgRecordList',
        data: opt,
        success: cb
    });
};