import requireAll from 'require-all'
import async from 'async'
import log from './log'

export function run (cb) {
    cb = cb || () => {}

    let tasks = requireAll({
        dirname: __dirname + '/configuration',
        filter: /(.*).js/
    })

    // async function each () {
    //
    //
    //     console.log(tasks)
    //     console.log(Object.keys(tasks))
    //
    // }
    // // each()

    console.log('jssfsf')

    // async.each(Object.keys(tasks), function(taskName, callback){
    //     tasks[taskName](callback);
    // }, cb);

}

run()
