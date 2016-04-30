import {resolve} from 'path';
import {writeFile, readFile} from 'fs';
import sass from 'node-sass';
import postcss from 'postcss';
import syntax from 'postcss-scss';
import cssnext from 'postcss-cssnext';
import selector from 'postcss-custom-selectors';
import colorFunction from 'postcss-color-function';
import autoprefixer from 'autoprefixer-core';
import reporter from 'postcss-reporter';
import log from './log';

export default function css () {
    const LIQUIDFONTFILE = resolve('./src/scss/atoms/font-face.scss.liquid');
    const SRCFILE   = resolve('./src/scss/index.scss');
    const BUILDFILE = resolve('./assets/index.scss.liquid');
    const LIBSPATH  = resolve('./src/scss/libs');

    const SCSS = sass.renderSync({
        file: SRCFILE,
        outputStyle: 'nested',
        sourceMap: true
    });

    const PROCESSOR = [
        autoprefixer({ browsers: ['last 2 versions']}),
        cssnext(),
        reporter({
            plugins: [
                'postcss-cssnext',
                'postcss-custom-selectors',
                'colorFunction'
                ]
            })
    ];


    const HANDLEEXTERNALFILE = cb => {
        readFile(LIQUIDFONTFILE, 'utf8', (err, data) => {
             cb(data);
        })
    };

    let futureCSS = postcss(PROCESSOR).process(SCSS.css, {parcer: syntax})
    .then(result => {
        HANDLEEXTERNALFILE(data => {
            console.log(result.messages.toString());
            const RESULTFILE = `${data}${result}`;
            writeFile(BUILDFILE, RESULTFILE);
            console.log(log.info('[CSS build task]: ') + 'Liquid syntax css (font-face.scss.liquid) was successfully concatenated');
        });
        console.log(log.info('[CSS build task]: ') + 'compilation and transformation was successfully completed');
    }, err => {
            console.error(log.error('[CSS build task error]: '), err);
    });
}
