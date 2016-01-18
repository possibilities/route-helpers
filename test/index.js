import chai from 'chai'

import { routeFromUrlHelper, urlFromRouteHelper } from '../src/index'

const routes = [
  // Note: purposely starting with 1, 3, then 2 placeholders to ensure
  // when there's no match the next one is checked and when there's a match
  // followed by another item that would also match otherwise. AKA we only
  // match when there's a full match and continue until there is.
  '/fruits/:fruit',
  '/fruits/:fruit/veggies/:veggie/meats/:meat',
  '/fruits/:fruit/veggies/:veggie',
]

const routeFromUrl = routeFromUrlHelper(routes)
const urlFromRoute = urlFromRouteHelper(routes)

describe('routeFromUrl', () => {
  it('matches nothing', () => {
    const url = '/grains/rice'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = {}
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches a single value', () => {
    const url = '/fruits/apple'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = { fruit: 'apple' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches multiple values', () => {
    const url = '/fruits/apple/veggies/celery/meats/pork'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = { fruit: 'apple', veggie: 'celery', meat: 'pork' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('matches when trailing slash is present', () => {
    const url = '/fruits/apple/'
    const actualRoute = routeFromUrl(url)
    const expectedRoute = { fruit: 'apple' }
    chai.assert.deepEqual(expectedRoute, actualRoute)
  })

  it('reverses nothing', () => {
    const route = {}
    const actualUrl = urlFromRoute(route)
    const expectedUrl = undefined
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses a single value', () => {
    const route = { fruit: 'apple' }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses multiple values', () => {
    const route = { fruit: 'apple', veggie: 'celery', meat: 'pork' }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple/veggies/celery/meats/pork'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with undefined values', () => {
    const route = { fruit: 'apple', veggie: 'celery', meat: undefined }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple/veggies/celery'
    chai.assert.equal(expectedUrl, actualUrl)
  })

  it('reverses and omits keys with null values', () => {
    const route = { fruit: 'apple', veggie: 'celery', meat: null }
    const actualUrl = urlFromRoute(route)
    const expectedUrl = '/fruits/apple/veggies/celery'
    chai.assert.equal(expectedUrl, actualUrl)
  })
})
