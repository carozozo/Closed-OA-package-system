/**
 * the template loader
 * there are 4 kinds template-type
 * 1. basic: the basic-layout(header/container(content)/footer) with <html><header><body>(master)
 * 2. blank: the blank-layout with <html><header><body>(master)
 * 3. content: basic-layout(header/container(content)/footer)
 * 4. empty: all empty but content
 *
 * @author Caro.Huang
 */
tl.template = (function () {
    var self = {};
    self.aJs = [];
    self.aCss = [];
    var getTplDir = function () {
        // the full path of template
        return  tg.tplDirFull;
    };
    var getLayoutDir = function () {
        var rootDir = getTplDir();
        return tl.files.normalizePath(rootDir, 'layouts');
    };
    var getIncludeDir = function () {
        var dir = getLayoutDir();
        return tl.files.normalizePath(dir, 'includes');
    };
    var getBasicLayoutPath = function () {
        var dir = getLayoutDir();
        return tl.files.normalizePath(dir, 'basic.html');
    };
    var getContentLayoutPath = function () {
        var dir = getLayoutDir();
        return tl.files.normalizePath(dir, 'content.html');
    };
    var getEmptyLayoutPath = function () {
        var dir = getLayoutDir();
        return tl.files.normalizePath(dir, 'empty.html');
    };
    var getLayoutPathByTplType = function (tplType) {
        if (tplType === 'empty' || !tplType) {
            return getEmptyLayoutPath();
        }
        if (tplType === 'content') {
            return getContentLayoutPath();
        }
        // tplType = 'basic'/'blank'
        return getBasicLayoutPath();
    };
    var setWebFile = function (getFileOpt, cfgKey, cb) {
        var oCfg = tcfg.template || {};
        var aFilePath = oCfg[cfgKey] || [];
        var webDirFull = tg.webDirFull;
        tl.object.eachObj(aFilePath, function (i, eachPath) {
            var path = tl.files.normalizePath(webDirFull, eachPath);
            if (tl.files.isDir(path)) {
                var files = tl.files.readDir(path, getFileOpt);
                tl.object.eachObj(files, function (j, file) {
                    file = tl.files.normalizePath(eachPath, file);
                    tl.helper.executeIfFn(cb, file);
                });
                return;
            }
            if (tl.files.isFile(path)) {
                tl.helper.executeIfFn(cb, eachPath);
            }
        });
    };
    var setCss = function () {
        var getFileOpt = {
            getFullPath: false,
            getDir: false,
            getByExtend: 'css'
        };
        setWebFile(getFileOpt, 'aCss', function (path) {
            self.addCss(path);
        });
    };
    var setJs = function () {
        var getFileOpt = {
            getFullPath: false,
            getDir: false,
            getByExtend: 'js'
        };
        setWebFile(getFileOpt, 'aJs', function (path) {
            self.addJs(path);
        });
    };
    /**
     * cover template-type to model
     * @param contentPath
     * @param [tplType]
     * @param [model]
     * @returns {{}}
     */
    var coverModel = function (contentPath, tplType, model) {
        var aLayoutType = ['empty', 'basic', 'content', 'blank'];
        var tplLayouts = {};
        var useContent = true;
        tplType = aLayoutType.indexOf(tplType) > -1 ? tplType : aLayoutType[0];
        model = model || {};
        (function coverContentPath() {
            // add '.html' if not exists
            contentPath = tl.string.addTail(contentPath, '.html');
            // get the content file's full path
            contentPath = self.coverToFullTplPath(contentPath);
            // content file not exists, get index page
            if (!tl.files.ifFileExists(contentPath)) {
                contentPath = 'index.html';
                contentPath = self.coverToFullTplPath(contentPath);
            }
        })();
        (function formatTplLayouts() {
            var includeDir = getIncludeDir();
            var defaultHeaderPath = tl.files.normalizePath(includeDir, 'header.html');
            var defaultFooterPath = tl.files.normalizePath(includeDir, 'footer.html');
            var useMaster = false;
            switch (tplType) {
                case 'basic':
                    useMaster = true;
                    tplLayouts = {
                        header: defaultHeaderPath,
                        footer: defaultFooterPath
                    };
                    break;
                case 'blank':
                    useMaster = true;
                    useContent = false;
                    tplLayouts = {
                        header: false,
                        footer: false
                    };
                    break;
                case 'content':
                    tplLayouts = {
                        header: defaultHeaderPath,
                        footer: defaultFooterPath
                    };
                    break;
                default:
                    tplLayouts = {};
                    break;
            }
            if (useMaster) {
                self.webFileRandom = '?random=' + tl.string.random(5);
                setCss();
                setJs();
            }
        })();
        model.useContent = useContent;
        model.tplLayouts = tplLayouts;
        model.tplLayouts.content = contentPath;
        return model;
    };
    /**
     * auto add template-root-path if not exist
     * @param path
     * @returns {*|string}
     */
    self.coverToFullTplPath = function (path) {
        path = tl.files.normalizePath(path);
        if (!self.isFullTplPath(path)) {
            var rootDir = getTplDir();
            path = tl.files.normalizePath(rootDir, path);
        }
        return path;
    };
    /**
     * check if path contain template-root-path
     * @param path
     * @returns {boolean}
     */
    self.isFullTplPath = function (path) {
        path = tl.files.normalizePath(path);
        var rootDir = getTplDir();
        return (path.indexOf(rootDir) === 0);
    };
    /**
     * push the css path into aCss
     * @param path
     */
    self.addCss = function (path) {
        path = tl.files.normalizePath(path);
        tl.array.pushNoDup(self.aCss, path);
    };
    /**
     * push the js path into aJs
     * @param path
     */
    self.addJs = function (path) {
        path = tl.files.normalizePath(path);
        tl.array.pushNoDup(self.aJs, path);
    };
    /**
     * load the layout, and set content to print web page
     *
     * ex1. use the basic-layout and set index.html as content
     * [tl.template.render('index', 'basic')]
     *
     * ex2. use the blank-layout
     * [ tl.template.render('index', 'blank', {some model:'some value'} ]
     *
     * the content path is basic from [public/template/]
     * the layout path is basic from [public/template/layouts/]
     * @param contentPath
     * @param [tplType]
     * @param [model]
     */
    self.renderHtml = function (contentPath, tplType, model) {
        try {
            model = coverModel(contentPath, tplType, model);
            var layoutPath = getLayoutPathByTplType(tplType);
            tl.response.renderResHtml(layoutPath, model);
        } catch (e) {
            tl.console.logErr('tl.template.render', e, {
                contentPath: contentPath,
                model: model,
                tplType: tplType
            });
            tl.systemRes.resErr();
        }
    };
    /**
     * get template html with callback, or get returned value
     * @param contentPath
     * @param tplType
     * @param [model]
     * @param [cb]
     */
    self.getHtmlCbr = function (contentPath, tplType, model, cb) {
        try {
            model = coverModel(contentPath, tplType, model);
            var layoutPath = getLayoutPathByTplType(tplType);
            var swig = require('swig');
            var tpl = swig.compileFile(layoutPath);
            var html = tpl(model);
            cb && cb(false, html);
            return html;
        } catch (e) {
            tl.console.logErr('template.getHtmlCbr', e, {
                exception: e,
                contentPath: contentPath,
                model: model,
                tplType: tplType
            });
            cb && cb(e);
            return null;
        }
    };
    return self;
})();