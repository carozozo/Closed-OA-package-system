var kraken = require('kraken-js');
var app = require('express')();
var options = {
    onconfig: function (config, next) {
        //any config setup/overrides here
        base.initOnConfig(config);
        next(null, config);
    }
};
// load custom library module, some explanations in there
var base = require('./base');

base.requireFiles();
app.use(kraken(options));
app.on('middleware:before', function (eventargs) {
    // depends on which middleware is about to be registered
    // console.log(eventargs.config.name);
});
app.on('middleware:before:shutdown', function (eventargs) {
    base.initOnStart(app);
});
app.on('middleware:before:router', function (eventargs) {
    app.use(base.initBeforeRoute);
});