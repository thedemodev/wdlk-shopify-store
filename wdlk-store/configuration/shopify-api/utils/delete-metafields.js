import shopifyAPI from 'shopify-node-api';
import {readFile} from 'fs';
import {CONFIG} from '../config';
import log from '../../log';

export default function deleteMeta (dataType, id, metafieldId) {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const TIME = new Date();
    let endPoint;

    if (dataType === 'store') {
        endPoint = `/admin/metafields/${id}.json`;

    } else {
        endPoint = `/admin/${dataType}/${id}/metafields/${metafieldId}.json`;
    }

    SHOPIFY.delete(endPoint, (err, data) => {
        if (err) {
            console.error(log.error(`${TIME} [Global Metafields DELETE request]: `), err);
            return;
        }
        console.log(log.info(`${TIME} [Global Metafields DELETE request]:`), 'was successful');
    });


}

// deleteMeta('products', 414029792, 14846254148);
// deleteMeta('store', 14842625092);
