/**
 * module for sending custom email/sms
 */
$.fn.pMsgSender = function () {
    var self = this;
    var showEmail = function () {
        dMsgSenders.hide();
        dEmailSender.showEmailSender();
    };
    var showSms = function () {
        dMsgSenders.hide();
        dSmsSender.showSmsSender();
    };
    (function dMsgType() {
        var dMsgType = self.find('#msgType');
        var msgTypeOpt = $.lDom.createLangSpanAuto('pMsgSender.msgTypeOpt');
        dMsgType
            .mSelect(msgTypeOpt)
            .action('change', function () {
                var msgType = dMsgType.val();
                if (msgType === 'email') {
                    showEmail();
                }
                else if (msgType === 'sms') {
                    showSms();
                }
            });
        return dMsgType.val('email');
    })();
    var dMsgSenders = (function () {
        return self.find('.msgSender');
    })();
    var dEmailSender = (function () {
        var dEmailSender = self.find('#emailSender');
        var cleanEmailSender = function () {
            formChecker.removeCheckerClass();
            $.lForm.clean(dEmailSender);
        };
        var dEmailTo = (function () {
            return dEmailSender.find('#emailTo');
        })();
        var dEmailTextContent = (function () {
            return dEmailSender.find('#emailTextContent');
        })();
        (function dEmailSubmitBtn() {
            var dEmailSubmitBtn = dEmailSender.find('#emailSubmitBtn');
            return dEmailSubmitBtn.mBtn('submit', function () {
                var pass = formChecker.checkForm();
                if (!pass) {
                    return;
                }
                var opt = $.lForm.coverToModel(dEmailSender);
                $.mNtfc.showSendingMsg();
                $.ajax.emailDoc.sendEmailAsyncAJ(opt, function (res) {
                    console.log('res=', res);
                    $.mNtfc.showMsgAftSent(res, function () {
                        cleanEmailSender();
                    });
                });
                $.mFancybox.close();
            });
        })();
        (function dEmailCleanBtn() {
            var dEmailCleanBtn = dEmailSender.find('#emailCleanBtn');
            return dEmailCleanBtn.mBtn('clean', function () {
                cleanEmailSender();
            });
        })();
        var formChecker = (function setChecker() {
            var formChecker = $.mFormChecker();
            formChecker.addRequired([dEmailTo, dEmailTextContent]);
            return formChecker;
        })();
        dEmailSender.showEmailSender = function () {
            cleanEmailSender();
            dEmailSender.fadeIn();
        };
        return dEmailSender;
    })();
    var dSmsSender = (function () {
        var dSmsSender = self.find('#smsSender');
        var cleanSmsSender = function () {
            formChecker.removeCheckerClass();
            $.lForm.clean(dSmsSender);
        };
        var dSmsTo = (function () {
            return dSmsSender.find('#smsTo');
        })();
        var dSmsContent = (function () {
            return dSmsSender.find('#smsContent');
        })();
        (function dSmsSubmitBtn() {
            var dSmsSubmitBtn = dSmsSender.find('#smsSubmitBtn');
            return dSmsSubmitBtn.mBtn('submit', function () {
                var pass = formChecker.checkForm();
                if (!pass) {
                    return;
                }
                var opt = $.lForm.coverToModel(dSmsSender);
                $.mNtfc.showSendingMsg();
                $.ajax.smsDoc.sendSmsAsyncAJ(opt, function (res) {
                    console.log('res=', res);
                    $.mNtfc.showMsgAftSent(res, function () {
                        cleanSmsSender();
                    });
                });
            });
        })();
        (function dSmsCleanBtn() {
            var dSmsCleanBtn = dSmsSender.find('#smsCleanBtn');
            return dSmsCleanBtn.mBtn('clean', function () {
                cleanSmsSender();
            });
        })();
        var formChecker = (function () {
            var formChecker = $.mFormChecker();
            formChecker.addRequired([dSmsTo, dSmsContent]);
            return formChecker;
        })();
        dSmsSender.showSmsSender = function () {
            cleanSmsSender();
            dSmsSender.fadeIn();
        };
        return dSmsSender.hide();
    })();
    self.showMsgSender = function () {
        showEmail();
        $.mFancybox.open(self);
    };
    return self;
};