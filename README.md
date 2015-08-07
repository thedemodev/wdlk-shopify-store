WDLK Ocean Store Launch
=======================

## Getting Started


### Syncing & Watching With the shopify_theme
In shopify you develop locally and use a syncing utility to push your changes to the server instantly, where you can view them.

The shopify_theme gem comes to rescue!!

#### Installation

1. `gem install shopify_theme`
2. Get the `confing.yml` file from product owner: mauricio.palma@woodlikeocean.com

#### Documentation

shopify_theme documentation:[http://shopify.github.io/shopify_theme/](http://shopify.github.io/shopify_theme/)


## Theme Development Workflow

1. Pull from `master`
2. Checkout new feature branch `git checkout -b feature/myfeaturebranch`
3. Log into Shopify store admin
4. Duplicate the **published theme** theme
5. Rename the duplicated theme to the name of your branch
6. Click `Customize Theme` of your new branch theme
7. Note the theme ID in the URL (example: /admin/themes/**9542224**/settings)
8. Edit the `theme_id` in `config.yml` to point to your branched theme
9. `theme watch` and do your work
10. Preview your work by navigating to that theme in Shopify admin and clicking preview
11. Make a pull request
12. Rebase onto master, push to master repo
13. Delete your branch (local and server)
14. Delete your branched theme in Shopify Admin


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

[Shopify Docs](http://docs.shopify.com/themes)
[Shopify Theme Development](https://robots.thoughtbot.com/shopify-theme-development)
