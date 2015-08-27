import path from 'path'
import chokidar from 'chokidar'
import run from './run'
import log from './log'

let onError = (err) => {
    if (err) console.error(log.error('Error: ') + err)
}

export let watch = (cb) => {
    let watcher = chokidar.watch(path.resolve('./src'), {ignoreInitial: true})

    console.log(watcher)
    watcher.on('all', () => {
        // run(onError)
    })


    cb()

}

watch()
