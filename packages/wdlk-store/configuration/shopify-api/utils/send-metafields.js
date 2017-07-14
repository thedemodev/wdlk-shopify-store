import shopifyAPI from 'shopify-node-api';
import {writeFile, readFile} from 'fs';
import {CONFIG} from '../config';
import log from '../../log';

export default function sendMetaFields (postData, endPoint) {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const TIME = new Date();

    let handleData = cb => {
        readFile(postData, (err, data) => {
            if (err) {
                console.error(`${TIME} [Bulk Metafields readFile]: `, log.error(err));
            }
            cb(data);
        });
    };

    handleData(data => {
        const DATAOBJ = JSON.parse(data);

        let postBulkFields = DATAOBJ.forEach((obj, i) => {
            const METAFIELD = {'metafield': obj['metafield']};
            const ENDPOINTUNIQUE = `${endPoint}${obj['id']}/metafields.json`;

            SHOPIFY.post(ENDPOINTUNIQUE, METAFIELD, (err, data, headers) => {
                    if (err) {
                        console.error(log.error(`${TIME} [Metafields POST request]: `), err);
                        return;
                    }

                    console.log(`${TIME} [Metafields POST request]:`, log.info('was successful'));
            });
        });
    });

}
