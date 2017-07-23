const state = {
  data: null,
  isLoading: false,
  error: null,
  menuDefaultActive: '0',
  options: {
    tab: [
      {
        value: '',
        label: '全部'
      },
      {
        value: 'ask',
        label: '问答'
      },
      {
        value: 'share',
        label: '分享'
      },
      {
        value: 'job',
        label: '招牌'
      },
      {
        value: 'good',
        label: '精华'
      },
    ]
  }
}
const actions = {
  changeMenuDefaultActive ({ commit }, val) {
    if (val === '-1') return
    commit('CHANGE_MENU_DEFAULT_ACTIVE', val)
  }
}

const mutations = {
  CHANGE_MENU_DEFAULT_ACTIVE (state, val) {
    state.menuDefaultActive = val
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
