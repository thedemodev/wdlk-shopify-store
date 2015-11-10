import requireAll from 'require-all';
import log from './log';
import async from 'async';

export default function run (cb) {
    // cb = cb || () => {};

    let tasks = requireAll({
        dirname: __dirname + '/configuration',
        filter: /(.*).js/
    });

    console.log('Going through the following tasks:', tasks);

    // $todo: check why babel is having trouble with async
    // Object.keys(tasks).forEach(function(taskName){
    //     const callback = tasks[taskName];
    //     console.log(callback);
    //     await tasks[taskName](callback);
    // });

    async.each(Object.keys(tasks), function(taskName, callback){
      tasks[taskName](callback);
    }, cb);

}
