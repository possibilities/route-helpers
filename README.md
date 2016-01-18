# Route helper

Match and reverse routes. Fast with no dependencies. Nothing more.

[![Build Status](https://circleci.com/gh/possibilities/route-helper/tree/master.svg?style=shield&circle-token=866d74ac3f34561836d27df438f150e5e7f1ae1c)](https://circleci.com/gh/possibilities/route-helper)
[![npm version](https://img.shields.io/npm/v/route-helper.svg?style=flat-square)](https://www.npmjs.com/package/route-helper)

## Install

```
npm install --save route-helper
```

## Usage

Declare some routes:

```
import { urlToRouteHelper, routeToUrlHelper } from 'route-helper'

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
