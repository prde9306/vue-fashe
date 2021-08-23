import Vue from 'vue'
import Router from 'vue-router'
//라우트 전용 컴포넌트 읽기
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Features from './views/Features'
import SignIn from'./views/SignIn'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/features',
      name: 'cart',
      component: Features
    },
    {
      path:'/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path:'/*',
      redirect:'/'
    }
  ]
})
