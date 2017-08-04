import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import topics from './modules/topics'
import topic from './modules/topic'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    topics,
    topic,
    user
  },
  mutations,
  actions
})

export default store
