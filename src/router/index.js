import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsPage from '../views/PostsPage';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'posts',
    component: PostsPage
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import(/* webpackChunkName: crud_posts */ '../views/CategoriesPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
