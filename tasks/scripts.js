import readFiles from './utils/read-files';
import {resolve} from 'path';
import {writeFile} from 'fs';
import log from './log';

export default function scripts () {
    const scripts = [
        resolve('./src/scripts/timber.js.liquid'),
        resolve('./src/scripts/index.js.liquid'),
    ];
    const outputFile = resolve('./assets/index.js.liquid');
    const time = new Date();

    readFiles(scripts, (err, data) => {
        if (err) {
            console.error(log.error(`${time} [Script Concatenation]:`), `${err} 😡`);
        }
        writeFile(outputFile, data.join('\r\n'));
        console.log(log.info(`${time} [Script Concatenation]:`), 'concatenation was successfull ✌🏻');
    });
}
