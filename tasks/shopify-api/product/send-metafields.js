import send from '../utils/send-metafields';
import {resolve} from 'path';

export default function sendBulk () {
    const BASEPATH = resolve(__dirname, '..', 'data/product/');
    const BULKFILE = `${BASEPATH}/product-metafield.json`;
    const ENDPOINT = '/admin/products/';

    send(BULKFILE, ENDPOINT);
}
sendBulk();
