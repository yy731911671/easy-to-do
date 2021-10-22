import Vue from 'vue'
import Router from 'vue-router'
import Mine from '@/pages/Mine/Mine'
import Login from '@/pages/Login/Login'
import ToDo from '@/pages/ToDo/Todo'
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
    },
    {
      path: '/news',
      name: 'News',
      component: News,
      meta: {
        showFooter: true
      }
    },{
      path: '/newsDetail',
      name: 'NewsDetail',
      component: NewsDetail
    },
  ]
})
