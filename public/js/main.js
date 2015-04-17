// save the model
$.tMod = {};
// save the localities language
$.tLan = {};
// save the config for client
$.tCfg = {};

$.init = (function () {
    var aFn = [];
    var self = function (fn, order) {
        var opt = {
            order: order,
            fn: fn
        };
        aFn.push(opt);
    };
    /**
     * run the init fns by order
     */
    self.startInit = function () {
        // sort the reg aFn by order
        $.lArr.sortByObjKey(aFn, 'order');
        $.each(aFn, function (index, obj) {
            var fn = obj.fn;
            $.lHelper.executeIfFn(fn);
        });
    };
    return self;
})();

// start when document ready
$(function () {
    $.lAjax.setupAjax();
    // set-timeout is used for [not be cached by browser]
    setTimeout(function () {
        $.lSysVar.getSysVars();
        $.lPage.goPreViewPage();
    }, 50);
});