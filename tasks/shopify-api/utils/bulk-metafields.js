import shopifyAPI from 'shopify-node-api';
import {writeFile, readFile} from 'fs';
import {CONFIG} from '../config';
import log from '../../log';

export default function sendMetaFields (/*endPoint,*/ postData) {
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

        let fieldList = DATAOBJ.map((obj, i) => {
            return obj['metafield'];
        });
        console.log(fieldList);
    });

    // let sendBulk = cb => {
    //     SHOPIFY.post(endPoint, postData, (err, data, headers) => {
    //         if (err) {
    //             if (err) {
    //                 console.error(log.error(`${TIME} [Metafields POST request]: `), err);
    //         }
    //         console.log(`${TIME} [Metafields POST request]:`, log.info('was successful'));
    //     });
    // };
}
