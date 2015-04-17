tapi.main = function (data) {
    var self = tl.systemMsg.extendRetObj({});
    var apiCaller = tl.apiCaller;
    var oaUrl = tcfg.apiUrl.oaUrl;
    var oaApiUrl = {
        login: function () {
            return oaUrl + 'login';
        }
    };
    var apiModel = {
        login: function () {
            var obj = {};
            obj.userName = data.userName;
            obj.password = data.pwd || data.password;
            return obj;
        }
    };

    self.loginApi = function () {
        var url = oaApiUrl.login();
        var m = apiModel.login();
        var res = apiCaller.postSync(url, m);
        self.transferRet(res);
    };
    return self;
};