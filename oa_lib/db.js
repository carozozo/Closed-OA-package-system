/**
 * TODO beta testing, not full support
 * basic db lib basic on mongoose/mongodb
 */
tl.db = (function () {
    var self = {};
    // http://mongoosejs.com/index.html
    var mongoose = require('mongoose');
    var connectDb = function (tableName, cb) {
        var catchConnectionError = function (cb) {
            mongoose.connection.on('error', function (e) {
                tl.console.logErr('Mongoose default connection', e);
                cb && cb(e);
            });
        };
        catchConnectionError(cb);
        mongoose.connect("mongodb://localhost/" + tableName);
    };

    self.findDbCb = function (tableName, Model, find, opt, cb) {
        find = find || {};
        if (tl.helper.isFn(opt)) {
            cb = opt;
            opt = null;
        }
        var aColumn = (opt && opt.aColumn) || null;
        var queryOpt = (opt && opt.queryOpt) || null;
        var getDbResult = function (e, data) {
            if (e) {
                tl.console.logErr('tl.db.findDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    find: find
                });
            }
            mongoose.connection.close();
            cb && cb(e, data);
        };
        mongoose.connect("mongodb://localhost/" + tableName);
        connectDb(tableName, cb);
        if (aColumn && queryOpt) {
            Model.find(find, aColumn, queryOpt, getDbResult);
        }
        else if (aColumn) {
            Model.find(find, aColumn, getDbResult);
        }
        else if (queryOpt) {
            Model.find(find, null, queryOpt, getDbResult);
        }
        else {
            Model.find(find, getDbResult);
        }
    };
    self.findOndDbCb = function (tableName, Model, find, opt, cb) {
        find = find || {};
        if (tl.helper.isFn(opt)) {
            cb = opt;
            opt = null;
        }
        var aColumn = (opt && opt.aColumn) || null;
        var queryOpt = (opt && opt.queryOpt) || null;
        var getDbResult = function (e, data) {
            if (e) {
                tl.console.logErr('tl.db.findOndDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    find: find
                });
            }
            mongoose.connection.close();
            cb && cb(e, data);
        };
        connectDb(tableName, cb);
        if (aColumn && queryOpt) {
            Model.findOne(find, aColumn, queryOpt, getDbResult);
        }
        else if (aColumn) {
            Model.findOne(find, aColumn, getDbResult);
        }
        else if (queryOpt) {
            Model.findOne(find, null, queryOpt, getDbResult);
        }
        else {
            Model.findOne(find, getDbResult);
        }
    };
    self.saveDbCb = function (tableName, Model, data, cb) {
        var model = new Model(data);
        connectDb(tableName, cb);
        model.save(function (e) {
            if (e) {
                tl.console.logErr('tl.db.saveDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    data: data
                });
            }
            mongoose.connection.close();
            cb && cb();
        });
    };
    self.removeDbCb = function (tableName, Model, find, cb) {
        connectDb(tableName, cb);
        Model.remove(find, function (e) {
            if (e) {
                tl.console.logErr('tl.db.removeDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    find: find
                });
            }
            mongoose.connection.close();
            cb && cb(e);
        });
    };
    self.updateDbCb = function (tableName, Model, find, data, opt, cb) {
        if (tl.helper.isFn(opt)) {
            cb = opt;
            opt = null;
        }
        var model = new Model(data);
        var modelData = model.toObject();
        var getDbResult = function (e, data, numberAffected) {
            if (e) {
                tl.console.logErr('tl.db.updateDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    find: find,
                    data: data
                });
            }
            mongoose.connection.close();
            cb && cb();
        };
        connectDb(tableName, cb);
        if (!opt) {
            Model.update(find, modelData, getDbResult);
            return;
        }
        Model.update(find, modelData, opt, getDbResult);
    };
    self.replaceDbCb = function (tableName, Model, find, data, opt, cb) {
        if (tl.helper.isFn(opt)) {
            cb = opt;
            opt = {};
        }
        var model = new Model(data);
        var modelData = model.toObject();
        // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
        delete modelData._id;
        opt.upsert = true;
        connectDb(tableName, cb);
        Model.update(find, modelData, opt, function (e, data, numberAffected) {
            if (e) {
                tl.console.logErr('tl.db.updateDbCb', e, {
                    tableName: tableName,
                    Model: Model,
                    find: find,
                    data: data
                });
            }
            mongoose.connection.close();
            cb && cb(e, data);
        });
    };
    return self;
})();