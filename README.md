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
  '/fruits/:fruit',
  '/fruits/:fruit/veggies/:veggie/meats/:meat',
  '/fruits/:fruit/veggies/:veggie',
]

const urlFromRoute = urlFromRouteHelper(routes)
const routeFromUrl = routeFromUrlHelper(routes)
```

Match:

```
routeFromUrl('/fruits/apple/veggies/celery/meats/pork')
  // <- { fruit: 'apple', veggie: 'celery', meat: 'pork' }
```

Reverse:

```
urlFromRoute({ fruit: 'apple', veggie: 'celery', meat: 'pork' })
  // <- '/fruits/apple/veggies/celery/meats/pork'
```
