import Vue from 'vue'
import VueRouter from 'vue-router'
import ToDoPage from '../views/ToDoPage'
import crudRoutes from './crudRoutes';

Vue.use(VueRouter)

const routes = [
  {
    path: '/todo',
    name: 'todo',
    component: ToDoPage
  },
  {
    path: '/',
    name: 'crud',
    component: () => import(/* webpackChunkName: "about" */ '../views/CrudPage.vue')
  },
  
  // merging crud routes
  ...crudRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
