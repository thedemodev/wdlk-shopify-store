import {createWriteStream} from 'fs';
import {resolve} from 'path';
import browserify from 'browserify';
import log from './log';

export default function bundle () {
    const entryFile = resolve('./src/scripts/index.js');
    const outputFile = resolve('./src/scripts/index.js.liquid');
    const time = new Date();

    browserify(entryFile)
        .transform('babelify', {presets: ['es2015', 'stage-0', 'stage-1']})
        .transform('uglifyify')
        .bundle()
        .on('error', err => {
            console.error(log.error(`${time} [Bundle Task]:`), `${err}😡`);
        })
        .pipe(createWriteStream(outputFile))
        .on('finish', () => {
            console.log(log.info(`${time} [Bundle Task]:`), 'bundled succesfully ✌🏻.')
    });
};

