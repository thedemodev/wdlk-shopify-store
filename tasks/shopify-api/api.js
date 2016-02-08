import config from './config';
import {material} from './data/meta_products.js'

export default function api () {
    const SHOPIFY = config();
    console.log(material);

    SHOPIFY.post('/admin/metafields.json', metaFields,  (err, data, headers) => {
        console.log(data); // Data contains product json information
        console.log(headers); // Headers returned from request
    });

    // SHOPIFY.delete('/admin/products/414029792/metafields/14571187524.json', metaFields,  (err, data, headers) => {
    //     console.log(err);
    //     console.log(data.STATUS); // Data contains product json information
    //     // console.log(headers); // Headers returned from request
    // });
}

api();
