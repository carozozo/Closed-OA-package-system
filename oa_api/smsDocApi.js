tapi.smsDoc = function (data) {
    var self = tl.systemMsg.extendRetObj({});
    var apiCaller = tl.apiCaller;
    var smsUrl = tcfg.apiUrl.smsUrl;
    var smsApiUrl = {
        sendSms: function () {
            try {
                var url = smsUrl;
                // ex. 886911234567
                url += '&phone=' + data.phone;
                url += '&msg=' + data.msg;
            } catch (e) {
            }
            return url;
        }
    };

    self.sendSmsApi = function () {
        var url = smsApiUrl.sendSms();
        var res = apiCaller.getSync(url);
        self.transferRet(res);
    };
    return self;
};