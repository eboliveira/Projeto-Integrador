import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
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
