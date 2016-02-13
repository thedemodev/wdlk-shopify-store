import send from '../utils/bulk-metafields';
import {resolve} from 'path';

export default function sendBulk () {
    const BASEPATH = resolve(__dirname, '..', 'data/product/');
    const BULKFILE = `${BASEPATH}/bulk.json`;
    const ENDPOINT = '/admin/products/';

    send(BULKFILE, ENDPOINT);

    console.log(ENDPOINT);

}
sendBulk();
