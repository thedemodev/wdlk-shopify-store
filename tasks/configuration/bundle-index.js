import {createWriteStream} from 'fs';
import {resolve} from 'path';
import browserify from 'browserify';

export default function bundle () {
    var entryFile = resolve('./src/scripts/index.js');
    var outputFile = resolve('./assets/index-new.js.liquid');

    browserify(entryFile)
        .transform('babelify', {presets: ['es2015', 'stage-0']})
        .bundle()
        .on('error', err => {
            console.error('Index Bundle Error:', err);
        })
        .pipe(createWriteStream(outputFile))
        .on('finish', () => {
            console.log('Index Bundle: was successfully completed');
        });
};

bundle();
