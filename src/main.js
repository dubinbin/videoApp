import Vue from 'vue'
import router from './router'
import Vuex          from 'vuex'
import store         from './vuex/store'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource   from 'vue-resource'
import App from './App'
import $ from 'jquery'
import './common/less/index.less'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.push('/home');