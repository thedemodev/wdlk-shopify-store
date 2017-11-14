import sendGlobalMetaFields from '../utils/send-global-metafields';
import {resolve} from 'path';

export default function sendGlobal () {
    const BASEPATH = resolve(__dirname, '..', 'data/product/');
    const FILE = `${BASEPATH}/global-metafield.json`;
    const ENDPOINT = '/admin/metafields.json';


    sendGlobalMetaFields(ENDPOINT, FILE);
}

sendGlobal();
