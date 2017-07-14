// @flow
const fetch = require('graphql-fetch')('https://wdkl-ocean.myshopify.com/api/graphql');
const config = require('./config');

const queryVars = {};

const query = `
{
  shop {
    products(first: 30, query: "title") {
      edges {
        node {
          title
          id
        }
      }
    }
  }
}
`;

const opts = {
  headers: config
};


fetch(query, queryVars, opts).then(results => {
  if (results.errors) {
    console.log('@@@@@', results.errors);
  }
  console.log(results);
});
