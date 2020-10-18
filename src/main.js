/* Imports e settings do App com o Vue.js   */
import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import router from './router'

import 'materialize-css'
import 'materialize-css/dist/js/materialize.min.js'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/sass/materialize.scss'

// Vue.config.productionTip = false
// Vue.config.devtools = true
// Vue.config.debug = true
// Vue.config.silent = false

Vue.config.productionTip = true
Vue.config.devtools = false
Vue.config.debug = false
Vue.config.silent = true 

Vue.config.performance = process.env.NODE_ENV === JSON.stringify('production');

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})