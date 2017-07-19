import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import login from './modules/login'

Vue.use(Vuex)

function createListState () {
  return { data: null, total: 0, isLoading: false, error: null }
}

const store = new Vuex.Store({
  modules: {
    login
  },
  mutations,
  actions
})

export default store
