import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('../views/test2.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
