import isomorphicFetch from 'isomorphic-fetch'
import URI from 'urijs'
import isEmpty from 'lodash/isEmpty'

const REQUEST_URL = 'https://cnodejs.org/api/v1'

export default function klgFetch (url, options = undefined) {
  if (options && options.query) {
    url = URI(url).query(options.query).toString()
    delete (options.query)
  }

  return isomorphicFetch(ensureAbsoluteUrl(url), optionsHandler(options))
    .then(handleResponse)
}

export function ensureAbsoluteUrl (input) {
  if (typeof input !== 'string') return input
  if (URI(input).is('absolute')) return input
  return URI(REQUEST_URL + input).normalize().toString()
}

export function optionsHandler (options) {
  const defaultOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }

  if (!options) return defaultOptions

  const finalOptions = {
    ...defaultOptions,
    ...options
  }

  delete finalOptions.body
  if (options.body) {
    if (!isEmpty(options.body)) {
      finalOptions.body = JSON.stringify(options.body)
    }
  }

  return finalOptions
}

export const handlers = {
  JSONResponseHandler (response) {
    return response.json()
      .then(json => {
        if (response.ok && json.code === 0) {
          return json.data
        } else if (response.ok && !json.code) {
          return json
        }
        return Promise.resolve({
          ...json,
          ...{
            statusCode: response.status, // statusCode is deprecated.
            status: response.status
          }
        })
      })
  },
  textResponseHandler (response) {
    if (response.ok) {
      return response.text()
    }
    return Promise.resolve({
      statusCode: response.status, // statusCode is deprecated.
      status: response.status,
      err: response.statusText
    })
  }
}

export function handleResponse (response) {
  const contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handlers.JSONResponseHandler(response)
  } else if (contentType.includes('text/html')) {
    return handlers.textResponseHandler(response)
  }
  throw new Error(`Sorry, content-type ${contentType} not supported`)
}
