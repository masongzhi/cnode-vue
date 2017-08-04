import Vue from 'vue'
import Router from 'vue-router'
import Frame from '../views/Frame'
import Topics from '../views/Topics/index.vue'
import Topic from '../views/Topic/index.vue'
import User from '../views/User/index.vue'
// import Login from '../views/login'
import Pell from '../views/Pell/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/topics',
      component: Frame,
      children: [
        {
          path: 'topics',
          component: Topics
        },
        {
          path: 'topic/:topicId',
          component: Topic
        },
        {
          path: 'pell',
          component: Pell
        },
        {
          path: 'user/:loginname',
          component: User
        }
      ]
    }
  ]
})
