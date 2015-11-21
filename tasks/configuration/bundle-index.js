import {createWriteStream} from 'fs';
import {resolve} from 'path';
import {libs} from '../libs';
import browserify from 'browserify';
import log from '../log';

export default function bundle () {
    var entryFile = resolve('./src/scripts/index.js');
    var outputFile = resolve('./assets/index.js.liquid');

    browserify(entryFile)
        .transform('babelify', {presets: ['es2015', 'stage-0']})
        .external(libs)
        .bundle()
        .on('error', err => {
            console.error(log.error('Index Bundle Error:'), err);
        })
        .pipe(createWriteStream(outputFile))
        .on('finish', () => {
            console.log(log.info('Index Bundle: was successfully completed'));
    });
};
