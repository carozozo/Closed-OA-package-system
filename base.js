/**
 * the base library before routing
 * load all custom-libraries and set useful variables to Global
 * @author Caro.Huang
 */

var base = {};
var nOs = require('os');
var nPath = require('path');
var nFs = require('fs');
var nEvents = require('events');
var aServerIp = (function () {
    var addresses = [];
    var interfaces = nOs.networkInterfaces();
    for (var name in interfaces) {
        if (!interfaces.hasOwnProperty(name)) {
            return null;
        }
        var eachInterface = interfaces[name];
        eachInterface.forEach(function (entry) {
            if (entry.family == 'IPv4' && !entry.internal) {
                addresses.push(entry.address)
            }
        });
    }
    return addresses;
})();
var requireFiles = function (path, cb) {
    if (typeof path !== 'string' || !path) return null;
    path = nPath.join(__dirname, path);
    if (!nFs.existsSync(path)) {
        console.error('require path not exists: ', path);
        return null;
    }
    if (nFs.lstatSync(path).isFile()) {
        var extendName = nPath.extname(path);
        if (extendName !== '.js') {
            return null;
        }
        return require(path);
    }
    if (nFs.lstatSync(path).isDirectory()) {
        nFs.readdirSync(path).forEach(function (fileName) {
            var fullPath = nPath.resolve(path + "/" + fileName);
            var stat = nFs.lstatSync(fullPath);
            if (stat === undefined) return null;
            var extendName = nPath.extname(fileName);
            if (extendName !== '.js') {
                return null;
            }
            cb && cb(fullPath, fileName);
            return require(fullPath);
        });
    }
    return null;
};

(function setGlobal() {
    // save main variables
    global.tg = {};
    // save the Travel Global configs
    global.tcfg = {};
    // save libraries
    global.tl = {};
    // save language
    global.tla = {};
    // save common models
    global.tmd = {};
    // save api module
    global.tapi = {};
    // save module's lib
    global.tm = {};
})();
(function requireLib() {
    requireFiles('oa_lib');
})();
(function requireConfig() {
    var configDir = 'oa_config';
    var commonCfgPath = tl.files.normalizePath(configDir, 'configCommon.js');
    var cfgCommon = requireFiles(commonCfgPath);
    // get product-server-ip array
    var aProductIp = cfgCommon.productIps || [];
    var aDevIp = cfgCommon.devIps || [];
    var cfgPath = (function () {
        var path = '';
        tl.object.eachObj(aServerIp, function (i, serverIp) {
            if (aProductIp.indexOf(serverIp) > -1) {
                tl.console.log('Load Product Config');
                path = tl.files.normalizePath(configDir, 'config.js');
                return false;
            }
            if (aDevIp.indexOf(serverIp) > -1) {
                tl.console.log('Load Dev Config');
                path = tl.files.normalizePath(configDir, 'configDev.js');
                return false;
            }
            tl.console.log('Load Others Config');
            path = tl.files.normalizePath(configDir, 'configOther.js');
            return true;
        });
        return path;
    })();
    var cfgByServerIp = requireFiles(cfgPath);
    tcfg = tl.object.extendObj(cfgCommon, cfgByServerIp);
})();
(function setVariables() {
    tg.serverRoot = __dirname;
    tg.serverIp = aServerIp[0];
    // the path about server
    tg.logDirFull = (function () {
        var path = tl.files.normalizePath(tg.serverRoot, 'oa_log/');
        tl.files.createDir(path);
        return path;
    })();
    tg.tempDirFull = (function () {
        var path = tl.files.normalizePath(tg.serverRoot, 'oa_temp/');
        tl.files.createDir(path);
        return path;
    })();
    // the path about web
    tg.webDir = tl.files.normalizePath('public/');
    tg.webDirFull = tl.files.normalizePath(tg.serverRoot, tg.webDir);
    // the relative path is under [public/]
    tg.imgDir = tl.files.normalizePath('img/');
    tg.imgDirFull = tl.files.normalizePath(tg.webDirFull, tg.imgDir);
    tg.tplDir = tl.files.normalizePath('templates/');
    tg.tplDirFull = tl.files.normalizePath(tg.webDirFull, tg.tplDir);
    tg.publicMountDir = tl.files.normalizePath('mount/');
    tg.publicMountDirFull = (function () {
        var path = tl.files.normalizePath(tg.webDirFull, tg.publicMountDir);
        tl.files.createDir(path);
        return path;
    })();
    tg.filesDir = tl.files.normalizePath('files/');
    tg.filesDirFull = (function () {
        var path = tl.files.normalizePath(tg.webDirFull, tg.filesDir);
        tl.files.createDir(path);
        return path;
    })();
    tg.uploadFilesDir = tl.files.normalizePath(tg.filesDir, 'upload_files/');
    tg.uploadFilesDirFull = (function () {
        var path = tl.files.normalizePath(tg.webDirFull, tg.uploadFilesDir);
        tl.files.createDir(path);
        return path;
    })();
    tg.emitter = (function () {
        var emitter = new nEvents.EventEmitter();
        emitter.setMaxListeners(0);
        return emitter;
    })();
    tg.fileUpload = (function () {
        // https://www.npmjs.org/package/fileupload
        var fileUpload = require('fileupload');
        // clean upload-files-folder
        tl.files.unlinkUnderDir(tg.uploadFilesDirFull);
        return fileUpload.createFileUpload(tg.uploadFilesDirFull).middleware;
    })();
    tg.hostName = tcfg.hostName;
    tg.port = tcfg.port || process.env.PORT || 80;
    tg.host = tg.hostName + ':' + tg.port;
})();
(function connectAmqpServer() {
    var amqpDirFull = tl.files.createDir('amqp/');
    var amqpFiles = tl.files.readDir(amqpDirFull);
    tl.object.eachObj(amqpFiles, function (i, file) {
        require(file);
    });
    // https://www.npmjs.org/package/amqp
    var amqp = require('amqp');
    var connectOpt = tcfg.amqpConnectOptions;
    var amqpCfg = tcfg.amqp;
    var connectSecondOpt = amqpCfg.connectSecondOptions;
    var amqpConnection = amqp.createConnection(connectOpt, connectSecondOpt);
    amqpConnection.on('ready', function () {
        tl.console.log('AMQP Server Connected');
        tg.emitter.emit('amqpConnect');
    });
    amqpConnection.on('error', function (err) {
        tl.console.log('AMQP Server Connection Error: ', err);
    });
    tg.amqpConnection = amqpConnection;
})();

base.requireFiles = function (extendBase) {
    extendBase = extendBase !== false;
    (function () {
        var aPath = ['oa_extend_lib', 'oa_api', 'oa_model', 'oa_lang', 'oa_module'];
        tl.object.eachObj(aPath, function (i, path) {
            requireFiles(path);
        });
        requireFiles('oa_update_once', function (fullPath, fileName) {
            var newPath = tl.files.normalizePath(tg.serverRoot, 'oa_update_backup', fileName);
            tl.files.rename(fullPath, newPath);
        });
    })();
    (function () {
        if (!extendBase) return;
        require('./extendBase.js');
    })();
};
base.initOnConfig = function (nconf) {
    // emit initOnConfig
    tg.emitter.emit('initOnConfig', nconf);
};
base.initOnStart = function (app) {
    (function setViewEngine() {
        // https://www.npmjs.org/package/consolidate
        var consolidate = require('consolidate');
        // http://paularmstrong.github.io/swig/
        var swig = require('swig');
        // the engine for .html files
        app.engine('html', consolidate.swig);
        // the view file type of server
        app.set('view engine', 'html');
        app.set('views', './public/templates');
        swig.setDefaults({ cache: false });
    })();
    (function setAppListener() {
        var port = tg.port;
        app.listen(port, function (err) {
            console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
        });
    })();
    (function setFavicon() {
        // https://www.npmjs.org/package/serve-favicon
        var serveFavicon = require('serve-favicon');
        var faviconPath = tl.files.normalizePath(tg.imgDirFull, 'favicon.ico');
        app.use(serveFavicon(faviconPath));
    })();
    (function connectRedisStore() {
        // https://www.npmjs.org/package/connect-redis
        var connectRedis = require('connect-redis');
        // https://www.npmjs.org/package/express-session
        var expresSession = require('express-session');
        var redisStore = connectRedis(expresSession);
        redisStore = new redisStore(tcfg.redisStoreOptions);
        redisStore.client.on('connect', function () {
            tl.console.log('Redis Store Connected');
            // emit redisStoreConnect
            tg.emitter.emit('redisStoreConnect');
        });
        var sessionOpt = tcfg.sessionOptions;
        sessionOpt.store = redisStore;
        app.use(expresSession(sessionOpt));
    })();
    // emit initOnStart
    tg.emitter.emit('initOnStart', app);
};
base.initBeforeRoute = function (req, res, next) {
    (function setCommonVar() {
        tl.request.setSystemReq(req);
        tl.response.setSystemRes(res);
        tg.host = req.headers.host || tg.host;
        // set max-listener to 0(no limit) for request
        req.setMaxListeners(0);
    })();
    (function fixResponse() {
        /*
         overwrite function [response.set] in nodule-module [express]
         ( default path: node_modules/express/lib/response.js )
         sometime response has been sent by others node-module
         need to check if response._header if exists before response.set
         */
        var responseSetFn = res.set;
        if (!responseSetFn) {
            return;
        }
        res.set = function (field, val) {
            if (!this._header) {
                return  responseSetFn.apply(this, [field, val]);
            }
            return this;
        };
    })();
    (function refreshSessionTime() {
        // refresh session time
        req.session.lastAccess = new Date().getTime();
        // update controller-log
        tl.ctrLogger.updateUserCtrLog(req);
    })();
    // emit initBeforeRoute
    tg.emitter.emit('initBeforeRoute', req, res);
    next && next();
};

module.exports = base;