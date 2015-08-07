WDLK Ocean Store Launch
=======================

## Getting Started

### Syncing & Watching With the shopify_theme
In shopify you develop locally and use a syncing utility to push your changes to the server instantly, where you can view them.

The shopify them gem comes to rescue!!

#### Installation
1. Get the `[secret theme id]` from product owner: mauricio.palma@woodlikeocean.com
2. `gem install shopify_theme [secret theme id]`

#### Usage
[Check the site docu:](http://shopify.github.io/shopify_theme/)





## shopify Production File Structure

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


[1]: http://docs.shopify.com/themes
[2]: https://github.com/Palmaswell/
