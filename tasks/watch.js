import {resolve, dirname, basename, extname} from 'path';
import watch from 'watch';
import timber from './timber';
import bundle from './bundle';
import css from './css';
import scripts from './scripts';
import log from './log';

export default function watchFolders () {
    var rootFolder = resolve('./src/');
    var timberFolder = `${rootFolder}/scripts/timber`;
    var sassFolder = `${rootFolder}/scss`;
    var bundleFolder = `${rootFolder}/scripts/modules`;

    function findTask (path, file, cb, ext) {
        if (path === dirname(file) || '.' + ext === extname(file)) {
            cb();
        }
    };

    watch.createMonitor(rootFolder,  monitor => {
        monitor.on('created', (file, stat) => {
            console.log(log.info('Created File:'), file , stat);

        })

        monitor.on('changed', (file, curr, prev) => {
            findTask(timberFolder, file, timber);
            findTask(sassFolder, file, css, 'scss');
            findTask(bundleFolder, file, bundle);
            // if (basename(file) === 'index.js') {
            //     bundle();
            // }
            if (basename(file) === 'index.js.liquid' || basename(file) === 'timber.js.liquid') {
                scripts();
            }
            console.log(log.info('Changed File:'), file);
        })

        monitor.on('removed', (file, stat) => {
            console.log(log.info('Removed File'), file, stat);
        })
    });
}

watchFolders();
