import Vue from 'vue'
import Router from 'vue-router'
import Frame from '../views/Frame'
import Home from '../views/Home/index.vue'
import Login from '../views/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Frame,
      children: [
        {
          path: 'home',
          component: Home
        }
      ]
    }
  ]
})
