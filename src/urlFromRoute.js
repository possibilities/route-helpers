import renderRoute from './renderRoute'

export default function urlFromRoute(routes, route) {
  const matchedRoute = routes.find((r) => {
    return Object.keys(route).length == r.names.length && Object.keys(route).every((name) => {
      return r.namesPresent[name]
    })
  })

  if (matchedRoute) {
    return renderRoute(route, matchedRoute.template)
  }
}
