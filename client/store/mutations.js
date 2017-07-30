import get from 'lodash/get'

function createListMutation (type, ...props) {
  function getMutationState (state, props) {
    const mutationState = get(state, props)
    if (!mutationState) {
      throw new Error(`getMutationState can not find state.${props.join('.')}`)
    }
    return mutationState
  }

  return {
    [type + '_START']: function (state) {
      const mutationState = getMutationState(state, props)
      mutationState.isLoading = true
    },
    [type + '_SUCCESS']: function (state, { response }) {
      const mutationState = getMutationState(state, props)
      mutationState.data = response.docs || response.list || response
      mutationState.total = response.total
      mutationState.isLoading = false
      mutationState.error = null
    },
    [type + '_ERROR']: function (state, { error }) {
      const mutationState = getMutationState(state, props)
      mutationState.error = error
      mutationState.data = null
      mutationState.isLoading = false
    }
  }
}

export default {
  // INVEST
  ...createListMutation('GET_TOPICS', 'topics'),
  ...createListMutation('GET_TOPIC_BY_ID', 'topic'),
}
