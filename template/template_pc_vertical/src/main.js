import Vue from 'vue';
import App from './App.vue';
/** 第三方通用组件 **/
require('./depend/3rd');

import store from './store';
import router from './router';

Vue.config.productionTip = false;

/* api统一出口 */
import apis from '../src/apis/index';
Vue.prototype.$api = apis;

import '@/assets/styles/main.css'; // global css

import '@/utils/permission'; // permission control

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
