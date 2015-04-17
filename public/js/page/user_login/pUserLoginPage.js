$.fn.pUserLoginPage = function () {
    var self = this;
    var login = function () {
        var userName = dUserName.val();
        var pwd = dPwd.val();
        userName && $.lUtil.login(userName, pwd, function () {
                // get the remember-id last time
                var rememberId = $.lCookie.get('rememberId');
                // set remember id if box-checked
                setRememberId();
                // user is not remembered before, or no remembered user
//                if ((rememberId && userName !== rememberId) || !rememberId) {
//                    $.lPage.goIndexPage({
//                        goBody: true
//                    });
//                    return false;
//                }
//                return true;
            },
            function (result) {
                if (result === '1000' || result === 'USER_DISABLE') {
                    dUserName.focus().select();
                } else if (result === '1001') {
                    dPwd.focus().val('');
                }
                var msg = $.lLang.parseLanPath('pUserLogin.resMsg')[result];
                $.mNtfc.show(msg, 'wng');
                return false;
            }
        );
    };
    var setRememberId = function () {
        var rememberId = '';
        if (dRememberId.prop('checked')) {
            rememberId = dUserName.val();
        }
        $.lCookie.set('rememberId', rememberId);
    };
    var dUserName = (function () {
        var dUserName = self.find('#userName');
        dUserName.onPressEnter(function () {
            login();
        });
        return dUserName;
    })();
    var dPwd = (function () {
        var dPwd = self.find('#pwd');
        dPwd.onPressEnter(function () {
            login();
        });
        return dPwd;
    })();
    var dRememberId = (function () {
        return self.find('#rememberId');
    })();
    (function dSubmit() {
        var dSubmit = self.find('#submit');
        dSubmit.action('click', function () {
            login();
        });
        return dSubmit;
    })();
    (function init() {
        var rememberId = $.lCookie.get('rememberId');
        if (rememberId) {
            dUserName.val(rememberId);
            dPwd.focus();
            dRememberId.prop('checked', true);
        } else {
            dUserName.focus();
        }
    })();
    return self;
};