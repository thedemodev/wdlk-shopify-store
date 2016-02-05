import {resolve} from 'path';
import {readFileSync, writeFile} from 'fs';
import sass from 'node-sass';
import postcss from 'postcss';
import syntax from 'postcss-scss';
import cssnext from 'postcss-cssnext';
import selector from 'postcss-custom-selectors';
import autoprefixer from 'autoprefixer-core';
import reporter from 'postcss-reporter';
import log from './log';

export default function css () {
    const SRCFILE   = resolve('./src/scss/index.scss');
    const BUILDFILE = resolve('./assets/index.scss.liquid');
    const LIBSPATH  = resolve('./src/scss/libs');

    const SCSS = sass.renderSync({
        file: SRCFILE,
        outputStyle: 'nested',
        sourceMap: true
    });

    const PROCESSOR = [
        autoprefixer({ browsers: ['last 3 versions']}),
        cssnext(),
        reporter({
            plugins: [
                'postcss-cssnext',
                'postcss-custom-selectors'
                ]
            })
    ];

    let futureCSS = postcss(PROCESSOR).process(SCSS.css, {parcer: syntax})
    .then(result => {
        writeFile(BUILDFILE, result);
        console.log(result.messages.toString());
        console.log(log.info('[CSS build task]: ') + 'compilation and transformation was successfully completed');
    }, err => {
            console.error(log.error('[CSS build task error]: '), err);
    });
}
