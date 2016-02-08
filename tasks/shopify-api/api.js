import request from '.request';
import {material} from './data/meta_products';



// export function getProductIds

// Get the global store metafield data for the product
request(get, '/admin/metafields.json', material);

// Get the ids
