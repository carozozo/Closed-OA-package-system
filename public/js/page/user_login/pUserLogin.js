$.pUserLogin = (function () {
    var self = {};
    self.userLoginPath = '/login';

    $.lPage.setPageInfo(self.userLoginPath, {
        setLogin: true,
//        pms: self.pagePms,
        title: 'pUserLogin.Login',
        fn: function () {
            $('#userLogin').pUserLoginPage();
        }
    });
    return self;
})();