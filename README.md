# WDLK Ocean Online Store

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


## Getting Started
This project has two divisions:
1. The shopify framework and CDN build process responsible to sync production assets in the shopify environment.
2. Our local development environment responsible for the modularization of the projects scss, js and other static assets and the generation of production assets in the adequate shopify production file `assets/`;

### Shopify Framework & Timber

#### Syncing & Watching With the shopify_theme
In Shopify you develop locally and use a syncing utility to push your changes to the server instantly, where you can view them.

The shopify_theme gem comes to rescue!!

##### Installation
To start development you need to install Theme Kit from Shopify

**Ideally the installation is being made with Homebrew**
1. `brew tap shopify/shopify`
2. `brew install themekit`
3. `theme configure` --password=store-password --store=wdkl-ocean.myshopify.com --themeid=your-theme-id


Theme Kit documentation:[http://shopify.github.io/themekit/](http://shopify.github.io/themekit/)


### Local Development Environment

1. `npm install`
2. `npm start`
3. `npm run watch`


## Theme Development Workflow

1. Pull from `master`
2. Checkout new feature branch `git checkout -b feature/myfeaturebranch`
3. Log into Shopify store admin
4. Duplicate the **published theme** theme
5. Rename the duplicated theme to the name of your branch
6. Click `Customize Theme` of your new branch theme
7. Note the theme ID in the URL (example: /admin/themes/**9542224**/settings)
8. `theme configure` --password=store-password --store=wdkl-ocean.myshopify.com --themeid=your-theme-id
9. `theme watch` and do your work
10. Preview your work by navigating to that theme in Shopify admin and clicking preview `theme open`
11. Make a pull request
12. Rebase onto master, push to master repo
13. Make your theme your master theme
14. Delete your branch (local and server)
15. Delete your branched theme in Shopify Admin


## Deployment

When it’s time to deploy, force-deploy the theme in the master branch onto the production site:

1. Make sure to kill your local theme watcher
2. Remove your theme ID (to point it to the published theme)
3. theme upload to push master onto the primary theme. If you have deleted files you can also run theme replace.

If you’re doing it right, you should always be confident in pushing master onto the published theme, provided you blacklisted the settings_data.json.


## Shopify Production File Structure

```
├── assets
│   └── Javascript, CSS, and theme images
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── custom code snippets
├── templates
│   ├── 404.liquid
│   ├── article.liquid
│   ├── blog.liquid
│   ├── cart.liquid
│   ├── collection.liquid
│   ├── collection.list.liquid
│   ├── index.liquid
│   ├── list-collections.liquid
│   ├── page.contact.liquid
│   ├── page.liquid
│   ├── product.liquid
│   ├── search.liquid
│   └── customers
│         └── required templates if customer accounts are enabled
├── config.yml
│   └── if using the theme gem (see link under Additional Resources)
```

[Shopify Docs](http://docs.shopify.com/themes)

[Shopify Theme Development](https://robots.thoughtbot.com/shopify-theme-development)

## Metafields
Currently we are working with the postman app to edit and maintain
the products metafields.

To get a list of all the available metafields in the store, you can run the command `npm run product-data`.

### Postman Setup
1. Click Authorization and select Basic Auth from the Type dropdown.
2. For Username and Password provide your store private API key and password respectively.

### Shopify Metafields API
You can find the complete Shopify Metafields API documentation under:
[Metafields Docs](https://help.shopify.com/api/reference/metafield)

#### Product Metafields
The WDLK Ocean store has following custom metafields for its products:
* `"key": "Product Features"` Which describes the main features of the product.
* `"key": "Product Fit & Guide"` Fit and coverage guided is only used in the liquid template for bikinis. It could be extendable for garments in general.

Custom metafield for everything but bikinis/garments.
* `"key": "Material Description"`
* `"key": "Material Composition"`
* `"key": "Material Properties"`

#### Global/Store Metafields
The following store metafields are used in all products because the data
describes the marine protection of every product.

* `"key": "Marine Protection"`
* `"key": "Fabric Description"`
* `"key": "Fabric Composition"`
* `"key": "Fabric Properties"`

### Create New Product Metafield

1. Run `npm run product-data` to get all the products in the shop.
2. Verify the product #{id} in the generated **tasks/shopify-api/data/product/product-list.json**
3. (Optional) verify the product metafields in Postman `GET /admin/products/#{id}/metafields.json
`
4. In Postman, open a new tab and enter the authorization information, as before.
5. Select POST from the API actions dropdown, and enter the endpoint url for adding/updating a metafield: `https://wdkl-ocean.myshopify.com//admin/products/#{id}/metafields.json`.
6. Click Body and select "raw"; from the dropdown select "JSON (application/json)."
7. Send post it should look like these
```
{
  "metafield": {
    "namespace": "product",
    "key": "Product Features",
    "value": "Some content",
    "value_type": "integer"
  }
}
```
8. Take note of the JSON syntax for posting a new product. For this tutorial we will copy the JSON of the Burton Custom Freestyle product.
Add the JSON for your product in the Body of the request. The response should look something like this:

```
HTTP/1.1 201 Created
{
  "metafield": {
    "id": 915396088,
    "namespace": "product",
    "key": "Product Features",
    "value": "Some content",
    "value_type": "integer",
    "description": null,
    "owner_id": 632910392,
    "created_at": "2016-06-20T13:33:41-04:00",
    "updated_at": "2016-06-20T13:33:41-04:00",
    "owner_resource": "product"
  }
}
```


## Photography Art Direction

The banners for the home site stage are defined in 3 different breakpoints to deliver the best possible visual composition and site performance.

### Banners Measurements

#### Main Banner
* Desktop: 1440 x 810 (16:9)
* Tablet: 768 x 1024 (4:3)
* Smart Phone : 380 x 568  (3:2)

#### Half Banner
* Desktop: 720 x 405
* Tablet: 384 x 512 (4:3)
* Smart Phone : 568 x 320  (3:2)

#### Full Banner
* Desktop: 1440 x 810 (16:9)
* Tablet: 768 x 512 (4:3)
* Smart Phone : 480 x 320  (3:2)

#### Two Thirds Banner
* Desktop: 960 x 405
* Tablet: 512 x 512
* Smart Phone : 568 x 320  (3:2)

#### One Third Banner
* Desktop: 480 x 405 (16:9)
* Tablet: 256 x 512
* Smart Phone : 568 x 320  (3:2)

#Test
