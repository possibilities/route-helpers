import routeFromUrl from './routeFromUrl'
import urlFromRoute from './urlFromRoute'
import parseRoutes from './parseRoutes'

export function routeFromUrlHelper(routes) {
  const parsedRoutes = parseRoutes(routes)
  return routeFromUrl.bind(null, parsedRoutes)
}

export function urlFromRouteHelper(routes) {
  const parsedRoutes = parseRoutes(routes)
  return urlFromRoute.bind(null, parsedRoutes)
}
