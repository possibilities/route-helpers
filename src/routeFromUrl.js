const zip = (array1, array2) => {
  return array1.reduce((acc, item1, index) => {
    const item2 = array2[index]
    acc.push([item1, item2])
    return acc
  }, [])
}

const objectifyPairs = (pairs) => {
  return pairs.reduce((acc, pair) => {
    acc[pair[0]] = pair[1]
    return acc
  }, {})
}

export default function routeFromUrl(routes, url) {
  let matchedRoute

  routes.forEach((route) => {
    let matchValues
    if (!matchedRoute && (matchValues = url.match(route.matcher))) {
      matchedRoute = { ...route, matchValues: matchValues.slice(1) }
    }
  })

  if (matchedRoute) {
    return objectifyPairs(zip(matchedRoute.names, matchedRoute.matchValues))
  } else {
    return {}
  }
}
