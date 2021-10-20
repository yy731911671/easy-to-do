import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import Mine from '@/pages/Mine/Mine'
import Login from '@/pages/Login/Login'
import News from '../pages/News/News'
import NewsDetail from '../pages/News/NewsDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/news'
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
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },{
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    },
  ]
})
