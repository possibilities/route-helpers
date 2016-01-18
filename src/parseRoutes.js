// Build a regex based on a route template
//
// ## Example
//
// In:
//
// `/fruits/:fruitId/veggies/:veggieId`
//
// Out:
// ```
//
// `/^\/fruits\/(\w+)\/veggies\/(\w+)\/?$/`
//
// ```
const regExpFromRouteTemplate = (routeTemplate) => {
  // Each placeholder basically becomes a wildcard
  let regExpString = routeTemplate.replace(/:\w+/g, '(\\w+)')
  // Build up a string to use as a regular expression
  //   1. We add start/end markers so we get exact matches only
  //   2. We also allow an optional trailing slash
  regExpString = `\^${regExpString}\\\/?\$`

  return new RegExp(regExpString)
}

// Extract name metadata from a route template
//
// ## Example
//
// In:
//
// `/fruits/:fruitId/veggies/:veggieId`
//
// Out:
// ```
// {
//   names: ['fruitId', 'veggieId'],
//   namesPresent: { fruitId: true, veggieId: true }
// }
// ```
const nameMetadataFromRouteTemplate = (route) => {
  // Reduce over the "url template"'s parts to pull out metadata that other
  // parts of the app will use to match and/or reverse:
  //   1. a list of identifiers
  //   2. a lookup table of idenfitiers
  return route.split('/').reduce((nameInfo, routePart) => {
    // Identifiers are marked by a preceding colon
    if (routePart[0] === ':') {
      const name = routePart.slice(1)
      // Store the name
      nameInfo.names.push(name)
      // And the fact that it's present
      nameInfo.namesPresent[name] = true
    }

    // Return accumulator
    return nameInfo

    // Accumulator to hold the metadata
  }, { names: [], namesPresent: {}, })
}

export default function parseRoutes(routeTemplates) {
  // Map over the route templates to build up all the route metadata needed
  // later to match and reverse URLs.
  return routeTemplates.map((template) => {
    const { names, namesPresent } = nameMetadataFromRouteTemplate(template)
    return {
      template,
      names,
      namesPresent,
      matcher: regExpFromRouteTemplate(template),
    }
  })
}
