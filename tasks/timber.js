import fs from 'fs';
import {resolve} from 'path';
import async from 'async';
import log from './log';

export default function timber () {
    var timberPath = resolve('./src/scripts/timber');
    var libsPath = resolve('./src/scripts/libs');
    var outputFile = resolve('./assets/timber.js.liquid');

    var files = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/fastclick/lib/fastclick.js',
        'node_modules/handlebars/dist/handlebars.min.js',
        libsPath   + '/modernizr.min.js',
        libsPath   + '/prepare-transition.js',
        libsPath   + '/replace-url-params.js',
        timberPath + '/money-format.js',
        timberPath + '/cache-selectors.js',
        timberPath + '/init.js',
        timberPath + '/accessible-nav.js',
        timberPath + '/drawers-init.js',
        timberPath + '/mobile-nav-toggle.js',
        timberPath + '/get-hash.js',
        timberPath + '/product-page.js',
        timberPath + '/product-image-switch.js',
        timberPath + '/switch-image.js',
        timberPath + '/responsive-videos.js',
        timberPath + '/collection-views.js',
        timberPath + '/login-forms.js',
        timberPath + '/reset-password-success.js',
        timberPath + '/drawers.js',
        timberPath + '/ajax-cart.js'
    ];

    function readFiles (files, callback) {
        async.map(files, ((f, cb) => {
            fs.readFile(f, 'utf-8', cb)
        }), callback);
    };

    readFiles(files, (err, data) => {
        if (err) console.error(log.error('Timber Concat Read File Error:'), err);
        fs.writeFile(outputFile, data.join('\r\n'));
        console.log(log.info('Timber Concat:'), 'concatenation was successfull');
    });
};
