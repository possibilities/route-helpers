const regExpFromRouteTemplate = (routeTemplate) => {
  const regExpString = routeTemplate.replace(/:\w+/g, '(\\w+)')
  return new RegExp(`\^${regExpString}\$`)
}

const namesFromRoute = (route) => {
  return route.split('/').reduce((nameInfo, routePart) => {
    if (routePart[0] === ':') {
      const name = routePart.slice(1)
      nameInfo.names.push(name)
      nameInfo.namesPresent[name] = true
    }

    return nameInfo
  }, {
    names: [],
    namesPresent: {},
  })
}

export default function parseRoutes(routes) {
  return routes.map((template) => {
    const { names, namesPresent } = namesFromRoute(template)
    return {
      template,
      names,
      namesPresent,
      matcher: regExpFromRouteTemplate(template),
    }
  })
}
