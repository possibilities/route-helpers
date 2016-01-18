// Render a route template
//
// ## Example
//
// In:
//
// '/fruits/:fruitId/veggies/:veggieId'
// { fruitId: 'apple', veggieId: 'celery' }
//
// Out:
// ```
// '/fruits/apple/veggies/celery'
// ```
const renderRouteTemplate = (route, template) => {
  return Object.keys(route).reduce((template, name) => {
    const value = route[name]
    return template.replace(`:${name}`, value)
  }, template)
}

export default function urlFromRoute(routesMeta, route) {
  // Find the matching route based
  const matchedRoute = routesMeta.find((routeMeta) => {
    // If the route has any keys at all and all the keys are present in the
    // lookup table consider it a match.
    return Object.keys(route).length && Object.keys(route).every((key) => {
      return routeMeta.namesPresent[key]
    })
  })

  // If we found a match render the route template
  if (matchedRoute) {
    return renderRouteTemplate(route, matchedRoute.template)
  }
}
