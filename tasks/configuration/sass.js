import path from 'path';
import fs from 'fs';
import sass from 'node-sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer-core';
import log from '../log';

export default async function scss () {
    const SRCFILE   = path.resolve( __dirname, '..', '..', 'src/scss/index.scss');
    const BUILDFILE = path.resolve( __dirname, '..', '..', 'assets/index.scss.liquid');
    const LIBSPATH  = path.resolve( __dirname, '..', '..', 'src/scss/libs');

    sass.render({
        file: SRCFILE,
        outputStyle: 'nested',
        outFile: BUILDFILE,
        sourceMap: true,
        includePaths: [LIBSPATH]
    }, (err, result) => {
        if (err) {
            console.error(log.error('Error status: '), err.status);
            console.error(log.error('Error column: '), err.column, log.error('Error Line: '), err.line);
            console.error(log.error('Error found in the file: '), err.file );
            console.error(err.message);
        } else {
                var results = postcss([autoprefixer({ browsers: ['last 2 versions'] })]).process(result.css);

                fs.writeFile(BUILDFILE, results);
                console.log(results.messages.toString());
                console.log(log.info('info: ') + 'SASS compilation was successfully completed');
        }
    })
}
