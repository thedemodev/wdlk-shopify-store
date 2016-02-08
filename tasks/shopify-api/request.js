import log from '../log';
import config from './config';

export default function request (methodType, path, data) {
    const SHOPIFY = config();

    SHOPIFY.methodType(path, data, (err, data, headers) => {
        if (err) log.error('[API request error]: ', err);

        console.log(log.info('[API request data]: '), data);
        console.log(log.info('[API request headers]: '), data);
    });

    // SHOPIFY.post('/admin/metafields.json', metaFields,  (err, data, headers) => {
    //     console.log(data); // Data contains product json information
    //     console.log(headers); // Headers returned from request
    // });
}
