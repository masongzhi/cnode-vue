import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import topics from './modules/topics'
import topic from './modules/topic'

Vue.use(Vuex)

function createListState () {
  return { data: null, isLoading: false, error: null }
}

const store = new Vuex.Store({
  modules: {
    topics,
    topic
  },
  mutations,
  actions
})

export default store
