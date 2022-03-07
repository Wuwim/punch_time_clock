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
    path: '/promptText',
    name: 'promptText',
    component: () => import('../views/promptText.vue')
  },
  {
    path: '/statistics/statistics',
    name: 'statistics',
    component: () => import('../views/statistics/statistics.vue')
  },
  {
    path: '/statistics/summary',
    name: 'summary',
    component: () => import('../views/statistics/summary.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
