import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import home from './modules/home'

Vue.use(Vuex)

function createListState () {
  return { data: null, isLoading: false, error: null }
}

const store = new Vuex.Store({
  modules: {
    home
  },
  mutations,
  actions
})

export default store
