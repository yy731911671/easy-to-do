import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Mine from '@/pages/Mine/Mine'
Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/',
      redirect: '/home'
    }
  ]
})
