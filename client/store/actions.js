import {
  getTopics,
  getTopic,
  getUser
} from '../api'

function createAction (process, type) {
  return function ({ commit, dispatch, state }, ...rest) {
    commit(`${type}_START`)
    return process(...rest)
      .then(response => commit(`${type}_SUCCESS`, { response }))
      .catch(err => commit(`${type}_ERROR`, { err }))
  }
}

export default {
  // GET
  getTopics: createAction(getTopics, 'GET_TOPICS'),
  getTopicById: createAction(getTopic, 'GET_TOPIC_BY_ID'),
  getUserById: createAction(getUser, 'GET_USER_BY_ID')
}
