import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from './App.vue'
import InputTeste from './components/Dashboard/Views/InputTeste.vue'

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import 'vuetify/dist/vuetify.min.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(Vuetify)

const moment = require('moment')
require('moment/locale/pt-br')
Vue.use(require('vue-moment'), {moment})

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

import FullCalendar from 'vue-full-calendar';
import 'fullcalendar/dist/locale/pt';
Vue.use(FullCalendar);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
