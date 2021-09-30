import Vue from 'vue'
import VueRouter from 'vue-router'
import Commets from '../components/comments/Comments'

Vue.use(VueRouter)

const routes = [
  {
    path: '/comments/task=:id',
    name: 'Comments',
    component: Commets
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
