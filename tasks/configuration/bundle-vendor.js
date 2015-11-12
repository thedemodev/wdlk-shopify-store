import {createWriteStream} from 'fs';
import {resolve} from 'path';
import browserify from 'browserify';

export default function vendor () {
    var libsPath = resolve('./src/scripts/libs');
    var outputBundle = resolve('./assets/vendor.js');

    var libs = [
        libsPath + '/handlebars.min.js', // Is it really necessary?
        libsPath + '/fastclick.min.js', // Is it really necessary?
        libsPath + '/prepare-transition.js', // Check what does it do
        libsPath + '/replace-url-params.js',
        libsPath + '/respond.min.js', // Most probably I don't need it
        libsPath + '/shopify-money-format.js'
    ];

    browserify({debug: false})
        .require(libs)
        .bundle()
        .on('error', err => {
            console.error('Vendor Bundle Error:', err);
        })
        .pipe(createWriteStream(outputBundle))
        .on('finish', () => {
            console.log('Vendor Bundle: was successfully completed');
        });
}
