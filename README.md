# Route helper

Match and reverse routes. Fast with no dependencies. Nothing more.

[![Build Status](https://circleci.com/gh/possibilities/route-helper/tree/master.svg?style=shield&circle-token=866d74ac3f34561836d27df438f150e5e7f1ae1c)](https://circleci.com/gh/possibilities/route-helper)

## Install

```
npm install --save route-helper
```

## Usage

Declare some routes:

```
import { routeFromUrlHelper, urlFromRouteHelper } from 'route-helper'

const routes = [
  '/fruits/:fruitId',
  '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
  '/fruits/:fruitId/veggies/:veggieId',
]

const urlFromRoute = urlFromRouteHelper(routes)
const routeFromUrl = routeFromUrlHelper(routes)
```

Match:

```
const url = '/fruits/apple/veggies/celery/meats/pork'
routeFromUrl(url) // <- { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
```

Reverse:

```
const route = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
urlFromRoute(route) // <- '/fruits/apple/veggies/celery/meats/pork'
```
