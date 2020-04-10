import Vue from 'vue'
import App from './App.vue'
import vueRouter from "./router/index"
import axios from "./components/axios/axios";
import vueLazyLoad from 'vue-lazyload'
import store from './components/stroe'
import './less/index.less'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(vueLazyLoad,{
  preLoad:1,
  error:"/2.png",
  loading:"/2.png",
  attempt:1
})
new Vue({
  store,
  render: h => h(App),
  router:vueRouter
}).$mount('#app')
