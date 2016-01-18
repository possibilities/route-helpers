import chai from 'chai'

import { urlToRouteHelper, routeToUrlHelper } from '../src/index'

let urlToRoute
let routeToUrl

describe('urlToRoute', () => {
  beforeEach(() => {
    const routes = [
      '/fruits/:fruitId',
      '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
    ]
    urlToRoute = urlToRouteHelper(routes)
  })

  it('matches nothing', () => {
    const url = '/grains/rice'
    const actualRoute = urlToRoute(url)
    const expectedRoute = {}
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches a single value', () => {
    const url = '/fruits/apple'
    const actualRoute = urlToRoute(url)
    const expectedRoute = { fruitId: 'apple' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches multiple values', () => {
    const url = '/fruits/apple/veggies/celery/meats/pork'
    const actualRoute = urlToRoute(url)
    const expectedRoute = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches when trailing slash is present', () => {
    const url = '/fruits/apple/'
    const actualRoute = urlToRoute(url)
    const expectedRoute = { fruitId: 'apple' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  // This is a little weird and heavy handed but the library is meant to be
  // super simple so I don't want there to be any ambiguity about what order
  // matches happen in, etc.
  describe ('partial match is possible', () => {
    beforeEach(() => {
      // Note: the order here is what makes a partial match possible, but we're
      // testing that only full matches match.
      const routes = [
        '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
        '/fruits/:fruitId',
      ]
      urlToRoute = urlToRouteHelper(routes)
    })

    it('matches the full URL only', () => {
      const url = '/fruits/apple'
      const actualRoute = urlToRoute(url)
      const expectedRoute = { fruitId: 'apple' }
      chai.assert.deepEqual(expectedRoute, actualRoute)
    })
  })
})

describe('routeToUrl', () => {
  beforeEach(() => {
    const routes = [
      '/fruits/:fruitId',
      '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
    ]
    routeToUrl = routeToUrlHelper(routes)
  })

  it('reverses nothing', () => {
    const route = {}
    const actualUrl = routeToUrl(route)
    const expectedUrl = undefined
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses a single value', () => {
    const route = { fruitId: 'apple' }
    const actualUrl = routeToUrl(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses multiple values', () => {
    const route = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
    const actualUrl = routeToUrl(route)
    const expectedUrl = '/fruits/apple/veggies/celery/meats/pork'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with undefined values', () => {
    const route = { fruitId: 'apple', veggieId: undefined, meatId: undefined }
    const actualUrl = routeToUrl(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with null values', () => {
    const route = { fruitId: 'apple', veggieId: null, meatId: null }
    const actualUrl = routeToUrl(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })
})
