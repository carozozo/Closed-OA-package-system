module.exports = function (router) {
    router.get('/', function () {
        tl.template.renderHtml('index', 'blank');
    });
};