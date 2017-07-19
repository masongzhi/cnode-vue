import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App/index.vue'
import router from './router'
import store from './store'
import './element-ui'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
