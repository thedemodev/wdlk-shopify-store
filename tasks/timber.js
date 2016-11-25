import readFiles from './utils/read-files';
import {writeFile} from 'fs';
import {resolve} from 'path';
import log from './log';

export default function timber () {
    //-- Timber is the legacy framework with which
    //-- the project was started.
    //-- Libraries, like the name says it are external libraries.
    //-- Liquified are js files that contains liquid objects.
    //-- not necessarely nice, but the best solution so far.
    let timberPath = resolve('./src/scripts/timber');
    let libsPath = resolve('./src/scripts/libs');
    let liquified = resolve('./src/scripts/liquified');
    let outputFile = resolve('./src/scripts/timber.js.liquid');

    let files = [
        `node_modules/jquery/dist/jquery.min.js`,
        `node_modules/fastclick/lib/fastclick.js`,
        `node_modules/handlebars/dist/handlebars.min.js`,
        `${libsPath}/modernizr.min.js`,
        `${libsPath}/prepare-transition.js`,
        `${libsPath}/replace-url-params.js`,
        `${timberPath}/money-format.js`,
        `${timberPath}/cache-selectors.js`,
        `${timberPath}/init.js`,
        `${timberPath}/get-hash.js`,
        `${timberPath}/product-page.js`,
        `${timberPath}/product-image-switch.js`,
        `${timberPath}/switch-image.js`,
        `${timberPath}/responsive-videos.js`,
        `${timberPath}/collection-views.js`,
        `${timberPath}/login-forms.js`,
        `${timberPath}/reset-password-success.js`,
        `${liquified}/facebook-pixel-events.js`
    ];

    readFiles(files, (err, data) => {
        if (err) console.error(log.error('Timber Concat Read File Error:'), err);
        writeFile(outputFile, data.join('\r\n'));
        console.log(log.info('Timber Concat:'), 'concatenation was successfull');
    });
};
timber();
