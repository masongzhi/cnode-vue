import {
  fetchDirectlyinvestLimitList
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
  // IVEST ORDER
  FETCH_DIRECTLYINVEST_LIMIT_LIST: createAction(fetchDirectlyinvestLimitList, 'FETCH_DIRECTLYINVEST_LIMIT_LIST')
}
