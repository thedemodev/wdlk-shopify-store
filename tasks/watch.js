import path from 'path';
import chokidar from 'chokidar';
import run from './run';


function onError(err) {
  if (err) console.error(err);
}

const test = "some random text";

export default (function watch () {
    let watcher = chokidar.watch(path.resolve('./src/'), {
        ignoreInitial: true});

    watcher.on('all', () => {
        run(err => {
            if(err) console.log(err);
        });
    });

    run(err => {
        if(err) console.log(err);
    });

})();
