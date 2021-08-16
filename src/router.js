import Vue from 'vue'
import Router from 'vue-router'
//라우트 전용 컴포넌트 읽기
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Features from './views/Features';

//플러그인으로 등록
Vue.use(Router)

//URL과 컴포넌트 메핑시키기
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
    }
  ]
})
