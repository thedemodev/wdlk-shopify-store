/* eslint-disable flowtype/require-valid-file-annotation */
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import flow from 'rollup-plugin-flow';
import uglify from 'rollup-plugin-uglify';
import visualizer from 'rollup-plugin-visualizer';

const processShim = '\0process-shim'
const prod = process.env.PRODUCTION;
const mode = prod ? 'production' : 'development';


const targets = prod ?
[
  {dest: 'dist/mini-cart.min.js', format: 'umd'}
] :
[
  {dest: 'dist/mini-cart.js', format: 'umd'},
  {dest: 'dist/mini-cart.es.js', format: 'es'}
];

const plugins = [

];
