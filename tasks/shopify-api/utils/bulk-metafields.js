import shopifyAPI from 'shopify-node-api';
import {writeFile, readFile} from 'fs';
import {CONFIG} from '../config';
import log from '../../log';

export default function sendMetaFields (file, endPoint) {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const TIME = new Date();


    let handleData = cb => {
        readFile(file, (err, data) => {
            if (err) {
                console.error(`${TIME} [Bulk Metafields readFile]: `, log.error(err));
            }
            cb(data);
        });
    };

    handleData(data => {
        const DATAJSON = JSON.parse(data);
        console.log(DATAJSON);
        // let fieldList = data.map((obj, i) => {
        //     console.log(obj.metafield)
        // });
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
