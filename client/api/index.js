import fetch from '../utils/fetch'

// Koala invest API
export function fetchDirectlyinvestLimitList (options) {
  return fetch('/directly_invest/limit', options)
}
