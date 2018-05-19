// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
window.Promise = require("bluebird");
// import store from './store'


// axios.defaults.baseURL = 'http://47.104.201.64:8080';
// axios.defaults.baseURL = 'http://localhost/data';
axios.defaults.baseURL = './getBackgroundData';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})

