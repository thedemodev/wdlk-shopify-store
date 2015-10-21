import path from 'path';
import chokidar from 'chokidar';
import run from './run';


function onError(err) {
    if (err) console.error(err);
}

export default (function watch () {
    let watcher = chokidar.watch(path.resolve('./src/'), {
        ignoreInitial: true});

    watcher.on('all', () => {
        run(onError);
    });

})();
