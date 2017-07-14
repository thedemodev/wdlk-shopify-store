import prepare from '../utils/prepare-metafields';
import shopifyAPI from 'shopify-node-api';

export default function prepareBulk () {
    const ENDPOINT = '/admin/products.json';
    prepare('product', ENDPOINT, 'features', 'string');
}

prepareBulk();
