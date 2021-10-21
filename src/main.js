import Vue from 'vue'
import App from './App.vue'
import {router} from "@/router";
import store from './store/index'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMoment from 'vue-moment'

Vue.use(VueMoment);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// import VueCookie from 'vue-cookies'

//using axios as a global object
window.axios = require('axios')
// Vue.use(VueCookie);

Vue.config.productionTip = false;

// Vue.filter('dateFormat', (value) => {
//   return moment(value, 'YYYYMMDD').format('YYYY년 MM월 DD일');
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
