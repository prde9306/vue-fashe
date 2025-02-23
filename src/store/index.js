import Vue from 'vue'
import Vuex from 'vuex'

import banner from './banner/index';
import product from './product/index';
import cart from './cart/index';
import blog from './blog/index';
import insta from './insta/index';
import account from "./user/index";
import category from "./category/index";
import order from './order/index'

//vuex 통합해서 관리하는 곳

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    banner,
    product,
    cart,
    blog,
    insta,
    account,
    category,
    order
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
})
