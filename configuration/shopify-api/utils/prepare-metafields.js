import shopifyAPI from 'shopify-node-api';
import {writeFile, readFile, stat, mkdir} from 'fs';
import {resolve} from 'path';
import {CONFIG} from '../config';
import log from '../../log';

export default function prepareMetafields (dataType, endPoint, nameSpace, metaType, metaKey) {
    const SHOPIFY = new shopifyAPI(CONFIG);
    const BASEPATH = resolve(__dirname, '..', `data/${dataType}/`);
    const TIME = new Date();
    metaKey = dataType || metakey;

    stat(BASEPATH, (err, stats) => {
        if (err) {
            mkdir(BASEPATH, err => {
                if (err) {
                    console.error(log.error(`${TIME} [${dataType} directory]: `), err);
                    return;
                }
            })
            console.log(log.info(`${TIME} [${dataType} directory]: `), 'was created' );
        }
        console.log(log.info(`${TIME} [${dataType} directory]: `), 'directory already exists' );
    });

    const LISTFILE = `${BASEPATH}/${dataType}-list.json`;
    const BULKFILE = `${BASEPATH}/${dataType}-draft.json`;


    const HANDLEPREPARATION = cb => {
       SHOPIFY.get(endPoint, (err, data, headers) =>  {
           if (err) {
               console.error(log.error(`${TIME} [${dataType} GET request]: `), err);
               return;
           }
           cb(data);
       });
   }

   HANDLEPREPARATION(data => {
       writeFile(LISTFILE, JSON.stringify(data, null, '\t'), err => {
           if (err) {
               console.error(log.error(`${TIME} [${dataType} writeFile]: `), err);
               return;
           }
           console.log(log.info(`${TIME} [${dataType} writeFile]:`), `${dataType}-list.json was created`);

           readFile(LISTFILE, (err, data) => {
               if (err) {
                   console.error(log.error(`${TIME} [${dataType} readFile]: `), err);
                   return;
               }

               const METADATA = JSON.parse(data);

               const METAFIELD = {
                       "namespace": `${nameSpace}`,
                       "key": `${metaKey}`,
                       "value": `${nameSpace}`,
                       "description": "default description programmatically generated",
                       "value_type": `${metaType}`
                    }

               let bulkData = METADATA[`${dataType}s`].map((obj, i) => {
                   const METADATATYPE = {};
                   METADATATYPE.id = obj.id;
                   METADATATYPE.title = obj.title;
                   METADATATYPE['metafield'] =  METAFIELD;
                   return METADATATYPE;
               });

               console.log(log.info(`${TIME} [Product readFile]: `), `${dataType}-list.json was read`);


               writeFile(BULKFILE, JSON.stringify(bulkData, null, '\t'), err => {
                   if (err) {
                       console.error(log.error(`${TIME} [${dataType} readFile]: `), err);
                       return;
                   }
                   console.log(log.info(`${TIME} [${dataType} readFile]: `), `${dataType}-bulk.json was created`);
               });
           });
       });
   });

}
