# Route helper

Match and reverse routes. Fast with no dependencies. Nothing more.

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
