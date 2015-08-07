# WDLK Ocean  File Architecture

Wished Architecture
├── assets
│   └── index.js.liquid (Minified and concatenate)
│   └── index.scss.liquid (Minified and concatenate)
│   └── index.svg (One huge svg file containing all of the icons)
│   └── scripts (Exists only locally)
│         ├── components
│         ├── libraries
│         ├── utilities (global helpers)
│   └── scss (Exists only locally)
│         ├── components
│         ├── utilities (global helpers)
├── config
│   ├── settings.html
│   ├── settings_data.json
├── docs (exists only locally)
│   ├── file-structure.md
│   └── browser-matrix.md
│   └── styleguide.pdf
├── layout
│   ├── theme.liquid
│   └── optional alternate layouts
├── snippets
│   └── custom code snippets
├── spec
│   └── tests and helpers
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
├── README.md
├── package.json (eventually)
├── config.yml
├── Licence
├── .gitignore
├── .editorconfig


Current Architecture
