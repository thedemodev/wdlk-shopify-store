# Woodlike Ocean Online Store

[![Build Status](https://travis-ci.org/woodlike/wdlk-shopify-store.svg?branch=master)](https://travis-ci.org/woodlike/wdlk-shopify-store)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Prerequisites

* Dependencies are maintained via `yarn`
* Tasks are executed via `npx`

### Bootstrapping dependencies

This packages are strictly required to get up and running with this repository.

* `git`
* `npx` ([npm](https://www.npmjs.com/package/npx]))
* `node` `8.4.0`

## Getting Started
In our store theme and app you develop locally and use a syncing utility. You develop locally and see the changes locally but your theme is being updated simultaneously.


1. `npm run bootstrap`
2. `./node_modules/.bin/slate` to make the slate command available for our scripts
4. In your `config.yml` add your store information and private app credentials
Slate documentation:[https://shopify.github.io/slate/](https://shopify.github.io/slate/)

## Development Workflow
1. Pull from `master`
2. Create new feature branch `git checkout -b feature/myFeatureBranch`
3. Log into Shopify store admin
4. Duplicate the **published theme** aka **master theme**
5. Rename the duplicated theme to the name of your branch
6. Click `Customize Theme` of your new branch theme
7. Note the theme ID in the URL (example: /admin/themes/**9542224**/settings)
8. Include your theme id in the **config.yml**
9. `npm run dev` and do your work
10. Your work will be automatically previewed and updated using browsersync
11. Make a pull request
12. Rebase onto master, push to master repo
13. Make your theme your master theme
14. Delete your branch (local and server)
15. Delete your branched theme in Shopify Admin
