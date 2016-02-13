import shopifyAPI from 'shopify-node-api';
import {readFile} from 'fs';
import {CONFIG} from '../config';
import log from '../../log';

export default function sendGlobalMetaFields (endPoint, postData) {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const TIME = new Date();

    readFile(postData, (err, data) => {
        if (err) {
            console.error(`${TIME} [Global Metafields readFile]: `, log.error(err));
        }

        SHOPIFY.post(endPoint, JSON.parse(data), (err, data, headers) => {
            if (err) {
                console.error(log.error(`${TIME} [Metafields POST request]: `), err);
                return;
            }

            console.log(log.info(`${TIME} [Metafields POST request]:`), 'was successful');
        });
    });
}
