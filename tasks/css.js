import {resolve} from 'path';
import {writeFile, readFile} from 'fs';
import sass from 'node-sass';
import postcss from 'postcss';
import syntax from 'postcss-scss';
import cssnext from 'postcss-cssnext';
import colorFunction from 'postcss-color-function';
import reporter from 'postcss-reporter';
import log from './log';

export default function css () {
    const srcFile   = resolve('./src/scss/index.scss');
    const buildFile = resolve('./src/assets/index.scss.liquid');
    const time = new Date();

    const scss = sass.renderSync({
        file: srcFile,
        outputStyle: 'nested',
        sourceMap: true
    });

    const processor = [
        cssnext({
            features: {
                autprefixer: { browsers: ['last 2 versions']}
            }
        }),
        reporter({
            plugins: [
                'postcss-cssnext',
                'postcss-custom-selectors',
                'colorFunction'
                ]
            })
    ];

    const handleExtFile = (file, cb) => {
        readFile(file, 'utf8', (err, data) => {
             cb(data);
        })
    };

    let futureCSS = postcss(processor).process(scss.css, {parcer: syntax})
    .then(result => {
        writeFile(buildFile, result, err => {
            if (err) throw err;
            console.log(log.info(`${time} [CSS build task]:`) + 'compilation and transformation was successfully completed');
        });
    }, err => {
            console.error(log.info(`${time} [CSS build task]:`), err);
    });
}
