import send from '../utils/bulk-metafields';
import {resolve} from 'path';

export default function sendBulk () {
    const BASEPATH = resolve(__dirname, '..', 'data/product/');
    const BULKFILE = `${BASEPATH}/send-bulk.json`;

    send(BULKFILE);

}
sendBulk();
