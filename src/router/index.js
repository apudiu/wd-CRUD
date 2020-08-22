import Vue from 'vue'
import VueRouter from 'vue-router'
import PostsPage from '../views/PostsPage';
import CategoriesPage from "../views/CategoriesPage";

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
    component: CategoriesPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
