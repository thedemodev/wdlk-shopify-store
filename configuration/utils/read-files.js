import {readFile} from 'fs';
import async from 'async';

export default function readFiles (files, callback) {
    async.map(files, ((f, cb) => {
        readFile(f, 'utf-8', cb)
    }), callback);
};
