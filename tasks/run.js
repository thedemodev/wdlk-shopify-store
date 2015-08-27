'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.run = run;

var _requireAll = require('require-all');

var _requireAll2 = _interopRequireDefault(_requireAll);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function run(cb) {
    cb = cb || function () {};

    var tasks = (0, _requireAll2['default'])({
        dirname: __dirname + '/configuration',
        filter: /(.*).js/
    });

    // async function each () {
    //
    //
    //     console.log(tasks)
    //     console.log(Object.keys(tasks))
    //
    // }
    // // each()

    console.log('jssfsf');

    // async.each(Object.keys(tasks), function(taskName, callback){
    //     tasks[taskName](callback);
    // }, cb);
}

run();