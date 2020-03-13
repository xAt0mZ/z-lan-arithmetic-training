/**
 * reflect-metadata import only needed once to use TS types
 * to auto fill vue-property-decorator Prop() type field
 */
import 'reflect-metadata';

import Vue from 'vue';
import App from './App.vue';


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
