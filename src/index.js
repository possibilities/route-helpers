import urlToRoute from './urlToRoute'
import routeToUrl from './routeToUrl'
import parseRoutes from './parseRoutes'

export function urlToRouteHelper(routes) {
  const parsedRoutes = parseRoutes(routes)
  return urlToRoute.bind(null, parsedRoutes)
}

export function routeToUrlHelper(routes) {
  const parsedRoutes = parseRoutes(routes)
  return routeToUrl.bind(null, parsedRoutes)
}
