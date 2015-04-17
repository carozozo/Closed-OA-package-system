tm.smsDoc = (function () {
    tg.emitter.on('initOnStart', function () {
        tl.msgType.addMsgMainType([
            typeCommonSms
        ]);
    });
    var self = {};
    var typeCommonSms = 'commonSms';
    var smsDocApi = tapi.smsDoc;

    /**
     * OPT for send-sms-api
     * phone/smsTo
     * msg/smsContent
     *
     * OPT
     * storeDb: won't store to DB if Store !== true
     * mainType: mainType for pkg-msg-record
     * subType: subType for pkg-msg-record
     *
     * @param opt
     * @returns {{err: *, res: *}}
     */
    self.sendSmsC = function (opt) {
        var phone = opt.smsTo || opt.phone;
        var msg = opt.smsContent || opt.msg;
        var pass = true;
        var validate = function (arg) {
            return arg && arg.length > 0;
        };
        (function validatePhone() {
            phone = tl.helper.coverToStr(phone);
            phone = tl.string.replaceAll(phone, '+', '');
            phone = tl.string.replaceAll(phone, ' ', '');
            if (!validate(phone) || !tl.string.isInt(phone) || phone.length < 10) {
                pass = false;
            }
        })();
        (function validateMsg() {
            phone = tl.helper.coverToStr(msg);
            if (!validate(msg)) {
                pass = false;
            }
        })();
        if (!pass) {
            tl.console.logErr('tm.smsDoc.sendSmsC', {
                phone: phone,
                msg: msg
            });
            return tl.systemMsg.extendRetObj({}, true);
        }
        (function coverOptForSms() {
            opt.phone = phone;
            opt.msg = msg;
        })();
        var oSms = new smsDocApi(opt);
        oSms.sendSmsApi();
        var retErr = oSms.getRetErr();
        (function storeDb() {
            if (opt.storeDb === false) {
                return;
            }
            var recordOpt = {
                mainType: opt.mainType || typeCommonSms,
                subType: opt.subType || '',
                msgTo: opt.phone,
                content: opt.msg
            };
            if (retErr) {
                recordOpt.status = 'error';
            }
            tm.pkgMsgRecord.createPkgMsgRecordC(recordOpt);
        })();

        return oSms.getRetObj();
    };
    return self;
})();