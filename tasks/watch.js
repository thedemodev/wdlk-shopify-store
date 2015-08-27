'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _run = require('./run');

var _run2 = _interopRequireDefault(_run);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var onError = function onError(err) {
    if (err) console.error(_log2['default'].error('Error: ') + err);
};

var watch = function watch(cb) {
    var watcher = _chokidar2['default'].watch(_path2['default'].resolve('./src'), { ignoreInitial: true });

    console.log(watcher);
    watcher.on('all', function () {
        // run(onError)
    });

    cb();
};

exports.watch = watch;
watch();