import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Client from 'graphql-js-client';
import typeBundle from './types';
import '../shared/app.css';

export const client = new Client(typeBundle, {
  url: 'https://wdkl-ocean.myshopify.com/api/graphql',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'daa081c10970495dac5bc9b187e5e333'
    }
  }
});

ReactDOM.render(
  <App client={client}/>,
  document.getElementById('root')
);
