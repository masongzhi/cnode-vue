const state = {
  data: null,
  isLoading: false,
  error: null,
  keyValue: {
    tab: {
      top: {
        type: 'primary',
        text: '置顶'
      },
      ask: {
        type: 'gray',
        text: '问答'
      },
      good: {
        type: 'success',
        text: '精华'
      },
      share: {
        type: 'gray',
        text: '分享'
      },
      job: {
        type: 'warning',
        text: '招聘'
      }
    }
  },
}
const actions = {
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
