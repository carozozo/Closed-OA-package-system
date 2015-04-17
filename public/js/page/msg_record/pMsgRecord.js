/**
 * module for sending custom email/sms
 */

$.pMsgRecord = (function () {
    var self = {};
    self.msgRecordListPath = '/msg_record/list/msgRecordList';
    self.msgRecordListName = 'msgRecordList';
    self.getDefListOpt = function () {
        return $.lPage.getPageListOpt(null, self.msgRecordListName);
    };
    (function regNavHeader() {
        var img = $.lDom.createImg('/img/logo/logo_travelglobal_02.png', 200).lClass('basic-link');
        $.mNav.regNavHeader(img, function () {
            if (!$.lUtil.isLogon()) {
                return;
            }
            $.lPage.goPage(self.msgRecordListPath);
        });
    })();
    $.lPage.setPageInfo(self.msgRecordListPath, {
        setIndex: true,
//        pms: 'dmcFareRuleCreatePms',
        title: 'common.Home',
        setListOpt: true,
//        opt: $.lPage.getPageListOpt(self.msgRecordListName),
        fn: function (opt) {
            $('#msgRecordListPage').pMsgRecordListPage(opt);
        }
    });
    return self;
})();