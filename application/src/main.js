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

import FullCalendar from 'vue-full-calendar';
import 'fullcalendar/dist/locale/pt';
Vue.use(FullCalendar);

// vue-bootstrap-datetimepicker
import datePicker from 'vue-bootstrap-datetimepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
Vue.use(datePicker);

// vue-router-user-roles
import VueRouterUserRoles from "vue-router-user-roles";
Vue.use(VueRouterUserRoles, { router });

let authenticate = Promise.resolve({ role: "guest", emailVerified:false, uid:'' });

authenticate.then(user => {
  Vue.prototype.$user.set(user);
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App),
    router
  })
});
