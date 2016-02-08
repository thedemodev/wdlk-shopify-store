import shopifyAPI from 'shopify-node-api';
import {CONFIG} from './config';
import {writeFile, readFile} from 'fs';
import log from '../log';

export function postProductMeta () {
    const SHOPIFY = new shopifyAPI(CONFIG);
    let storeProducts = `${__dirname}/data/store-products.json`;

     let getIds = cb => {
        SHOPIFY.get('/admin/products.json', function (err, data, headers)  {
            if (err) {
                console.error(log.error('[Product Metafields GET error]: '), err);
            }
             cb(data.products.map((product) => {
                return product.id;
            }));
        });
    }

    getIds(ids => {
        console.log(ids, '########');
        ids.forEach((e, i) => {
            console.log(e);
        })
    })


}

postProductMeta();
