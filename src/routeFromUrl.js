// https://en.wikipedia.org/wiki/Convolution_(computer_science)
const zip = (array1, array2) => {
  return array1.reduce((acc, item1, index) => {
    const item2 = array2[index]
    acc.push([item1, item2])
    return acc
  }, [])
}

// Similar to http://underscorejs.org/#object
const objectifyPairs = (pairs) => {
  return pairs.reduce((acc, pair) => {
    acc[pair[0]] = pair[1]
    return acc
  }, {})
}

export default function routeFromUrl(routes, url) {
  let matchedRoute

  // Iterate routes until we find a match
  routes.forEach((route) => {
    let matchValues
    // When we find a match inject the match info and skip further iterations
    if (!matchedRoute && (matchValues = url.match(route.matcher))) {
      matchedRoute = { ...route, matchValues: matchValues.slice(1) }
    }
  })

  if (matchedRoute) {
    // If we find anything we munge the data and return it
    return objectifyPairs(zip(matchedRoute.names, matchedRoute.matchValues))
  } else {
    return {}
  }
}
