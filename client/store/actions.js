import {
  getTopics
} from '../api'

function createAction (process, type) {
  return function ({ commit, dispatch, state }, ...rest) {
    commit(`${type}_START`)
    return process(...rest)
      .then(response => commit(`${type}_SUCCESS`, { response }))
      .catch(error => commit(`${type}_ERROR`, { error }))
  }
}

export default {
  // GET
  getTopics: createAction(getTopics, 'GET_TOPICS')
}
