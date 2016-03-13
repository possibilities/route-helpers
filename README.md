# Route helper

Match and reverse routes. Fast with no dependencies. Nothing more.

[![build status](https://img.shields.io/travis/possibilities/route-helpers/master.svg)](https://travis-ci.org/possibilities/route-helpers)
[![npm version](https://img.shields.io/npm/v/route-helpers.svg?style=flat-square)](https://www.npmjs.com/package/route-helpers)

## Install

```
npm install --save route-helpers
```

_Note: it is assumed that this will be used in a modern environemnt, for legacy environments add [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) in your app._

## Usage

Declare some routes:

```
import { urlToRouteHelper, routeToUrlHelper } from 'route-helpers'

const routes = [
  '/fruits/:fruitId',
  '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
  '/fruits/:fruitId/veggies/:veggieId',
]

const routeToUrl = routeToUrlHelper(routes)
const urlToRoute = urlToRouteHelper(routes)
```

Match:

```
const url = '/fruits/apple/veggies/celery/meats/pork'
urlToRoute(url) // <- { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
```

Reverse:

```
const route = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
routeToUrl(route) // <- '/fruits/apple/veggies/celery/meats/pork'
```

## Releases

`npm run build && npm publish`
