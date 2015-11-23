import readFiles from './utils/read-files';
import {resolve} from 'path';
import {writeFile} from 'fs';
import log from './log';

export default function scripts () {
    var scripts = [
        resolve('./src/scripts/timber.js.liquid'),
        resolve('./src/scripts/index.js.liquid'),
    ];
    var outputFile = resolve('./assets/index.js.liquid');

    readFiles(scripts, (err, data) => {
        if (err) console.error(log.error('Scripts Concat Read File Error:'), err);
        writeFile(outputFile, data.join('\r\n'));
        console.log(log.info('Scripts:'), 'concatenation was successfull');
    });
}

scripts();
