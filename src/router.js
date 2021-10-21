import Vue from 'vue'
import Router from 'vue-router'
//라우트 전용 컴포넌트 읽기
import Home from "@/views/Home";
import Shop from "@/views/Shop";
import Cart from "@/views/Cart";
import SignIn from "@/views/SignIn";
import SignUp from "@/views/SignUp";
import Profile from "@/components/user/profile";
import OrderList from "@/views/OrderList";
import ProductDetails from "@/components/shop/ProductDetails";
import OrderDetails from "@/components/order/OrderDetails"

Vue.use(Router);

export const router= new Router({
  mode: 'history',
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
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path:'/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path:'/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/myOrders',
      name: 'orderList',
      component: OrderList
    },
    {
      path: '/myOrders/:id',
      name: 'orderDetails',
      component: OrderDetails,
      props: route => ({id: Number(route.params.id)})
    },
    {
      path: '/productDetails',
      name: 'productDetails',
      component: ProductDetails
    },
    {
      path:'/*',
      redirect:'/'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/signIn', '/signUp'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('token');
//
//   if (authRequired && !loggedIn) {
//     return next('/signIn');
//   }
//
//   next();
// })
