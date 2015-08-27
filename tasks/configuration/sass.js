'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.scss = scss;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _autoprefixerCore = require('autoprefixer-core');

var _autoprefixerCore2 = _interopRequireDefault(_autoprefixerCore);

var _log = require('../log');

var _log2 = _interopRequireDefault(_log);

function scss() {
    var SRCFILE = _path2['default'].resolve(__dirname, '..', '..', 'src/scss/index.scss');
    var BUILDFILE = _path2['default'].resolve(__dirname, '..', '..', 'assets/index.scss.liquid');
    var LIBSPATH = _path2['default'].resolve(__dirname, '..', '..', 'src/scss/libs');

    _nodeSass2['default'].render({
        file: SRCFILE,
        outputStyle: 'nested',
        outFile: BUILDFILE,
        sourceMap: true,
        includePaths: [LIBSPATH]
    }, function (err, result) {
        if (err) {
            console.log(_log2['default'].error('Error status: '), err.status);
            console.log(_log2['default'].error('Error column: '), err.column, _log2['default'].error('Error Line: '), err.line);
            console.log(_log2['default'].error('Error found in the file: '), err.file);
            console.log(err.message);
        } else {
            var results = (0, _postcss2['default'])([(0, _autoprefixerCore2['default'])({ browsers: ['last 2 versions'] })]).process(result.css);

            _fs2['default'].writeFile(BUILDFILE, results);
            console.log(results.messages.toString());
            console.log(_log2['default'].silly('info: ') + 'SASS compilation was successfully completed');
        }
    });
}

scss();