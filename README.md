# Route helper

Match and reverse routes. Fast with no dependencies. Nothing more.

## Usage

Declare some routes:

```
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
