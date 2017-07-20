import fetch from '../utils/fetch'

// cnode API
export function getTopics (options) {
  return fetch('/topics', options)
}
