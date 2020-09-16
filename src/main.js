import Vue from 'vue'
import App from './App.vue'
import store from './store'


window.Sortable = require('sortablejs').Sortable;
window.MultiDrag = require('sortablejs').MultiDrag;

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
