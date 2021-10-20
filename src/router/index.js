import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Mine from '@/pages/Mine/Mine'
import Login from '@/pages/Login/Login'
import ToDo from '@/pages/ToDo/ToDo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
