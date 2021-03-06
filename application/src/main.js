import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import App from './App.vue'

import VTooltip from 'v-tooltip';
Vue.use(VTooltip);

import VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
Validator.localize('pt_BR')

Vue.use(VeeValidate, { inject: 'false', fieldsBagName: 'vvFields' });

import vueButtonEffect from 'vue-button-effect'
Vue.use(vueButtonEffect);

import LightTimeline from 'vue-light-timeline';
Vue.use(LightTimeline);

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@mdi/font/css/materialdesignicons.min.css'
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

// FullCalendar
import FullCalendar from 'vue-full-calendar'
import 'fullcalendar/dist/locale/pt'
Vue.use(FullCalendar);

// vue-bootstrap-datetimepicker
import datePicker from 'vue-bootstrap-datetimepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
Vue.use(datePicker)

// Noty for notifications on client
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
Vue.use(VueNoty, {
  timeout: 6000,
  visibilityControl: true
})

// Datetim picker
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)
import { Settings } from 'luxon'
Settings.defaultLocale = 'pt-br'

// Load spinners
import { VueSpinners } from '@saeris/vue-spinners'
Vue.use(VueSpinners)

// Load overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading, {
    isFullPage: true,
    color: '#3472F7',
    height: 128,
    width: 128,
    opacity:0.8,
    backgroundColor: '#000000'
  });

//Search bar autocomplete
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// vue-router-user-roles
import VueRouterUserRoles from "vue-router-user-roles"
Vue.use(VueRouterUserRoles, { router })

let authenticate = Promise.resolve({ role: "guest" })

authenticate.then(user => {
  Vue.prototype.$user.set(user)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router
  })
});
