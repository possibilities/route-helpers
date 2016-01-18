import chai from 'chai'

import { routeFromUrlHelper, urlFromRouteHelper } from '../src/index'

let routeFromUrl
let urlFromRoute

describe('routeFromUrl', () => {
  beforeEach(() => {
    const routes = [
      '/fruits/:fruitId',
      '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
    ]
    routeFromUrl = routeFromUrlHelper(routes)
  })

  it('matches nothing', () => {
    const url = '/grains/rice'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = {}
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches a single value', () => {
    const url = '/fruits/apple'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = { fruitId: 'apple' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches multiple values', () => {
    const url = '/fruits/apple/veggies/celery/meats/pork'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches when trailing slash is present', () => {
    const url = '/fruits/apple/'
    const actualRoute = routeFromUrl(url)
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
      routeFromUrl = routeFromUrlHelper(routes)
    })

    it('matches the full URL only', () => {
      const url = '/fruits/apple'
      const actualRoute = routeFromUrl(url)
      const expectedRoute = { fruitId: 'apple' }
      chai.assert.deepEqual(expectedRoute, actualRoute)
    })
  })
})

describe('urlFromRoute', () => {
  beforeEach(() => {
    const routes = [
      '/fruits/:fruitId',
      '/fruits/:fruitId/veggies/:veggieId/meats/:meatId',
    ]
    urlFromRoute = urlFromRouteHelper(routes)
  })

  it('reverses nothing', () => {
    const route = {}
    const actualUrl = urlFromRoute(route)
    const expectedUrl = undefined
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses a single value', () => {
    const route = { fruitId: 'apple' }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses multiple values', () => {
    const route = { fruitId: 'apple', veggieId: 'celery', meatId: 'pork' }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple/veggies/celery/meats/pork'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with undefined values', () => {
    const route = { fruitId: 'apple', veggieId: undefined, meatId: undefined }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with null values', () => {
    const route = { fruitId: 'apple', veggieId: null, meatId: null }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })
})
