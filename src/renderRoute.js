export default function renderRoute(route, template) {
  return Object.keys(route).reduce((template, name) => {
    const value = route[name]
    return template.replace(`:${name}`, value)
  }, template)
}
