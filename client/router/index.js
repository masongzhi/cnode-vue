import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Login
    }
  ]
})
