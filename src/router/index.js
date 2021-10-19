import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Mine from '@/pages/Mine/Mine'
import Login from '@/pages/Login/Login'
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
      component: Home
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
