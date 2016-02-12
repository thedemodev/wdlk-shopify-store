import shopifyAPI from 'shopify-node-api';
import {writeFile, readFile} from 'fs';
import {resolve} from 'path';
import {CONFIG} from '../config';
import log from '../../log';

export function prepareMetafields () {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const BASEPATH = resolve(__dirname, '..', 'data/product/');
    const LISTFILE = `${BASEPATH}/store-list.json`;
    const BULKFILE = `${BASEPATH}/bulk-draft.json`;
    const TIME = new Date();


     let handleMetafields = cb => {
        SHOPIFY.get('/admin/products.json', (err, data, headers) =>  {
            if (err) {
                console.error(log.error(`[Product GET request ${TIME}]: `), err);
            }
            cb(data);
        });
    }

    handleMetafields((data) => {
        writeFile(LISTFILE, JSON.stringify(data, null, '\t'), err => {
            if (err) {
                console.error(`${TIME} [Product writeFile]: `, log.error(err));
            }

            console.log(`${TIME} [Product writeFile]:`, log.info('store-list.json was created'));

            readFile(LISTFILE, (err, data) => {
                if (err) {
                    console.error(`${TIME} [Product readFile]: `, log.error(err));
                    return;
                }
                const READABLEPRODUCTS = JSON.parse(data);
                let id;
                let title;
                let description;

                let bulkData = READABLEPRODUCTS.products.map((obj, i) => {
                    let product = {};
                    product.id = obj.id;
                    product.title = obj.title;
                    product.description = obj.body_html;
                    return product;
                });
                console.log(`${TIME} [Product readFile]: `, log.info('store-list.json was read'));

                const READABLEBULK = JSON.stringify(bulkData, null, '\t');

                writeFile(BULKFILE, READABLEBULK, err => {
                    if (err) {
                        console.error(`${TIME} [Product readFile]: `, log.error(err));
                        return;
                    }
                    console.log(`${TIME} [Product readFile]: `, log.info('bulk-metafields.json was created'));
                });
            });
        });
    });
}

prepareMetafields();
