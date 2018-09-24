import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from './App.vue'
const teste = require('./services/PostsService')

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

// router setup
import routes from './routes/routes'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(Vuetify)
Vue.use(BootstrapVue);

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

teste.postEvent({
	"title":"Aniversário",
	"description": "Meu aniversário de 2018",
	"room" : "B102",
	"type_room" : "Laboratorio",
	"startDate": "2019-12-25T18:00:00Z",
	"finalDate": "2019-12-25T22:00:00Z",
	"schedule" :["5m2","5m3"],
	"responsable" : "Eduardo"
})