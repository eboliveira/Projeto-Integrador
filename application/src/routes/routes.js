import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview         from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile      from 'src/components/Dashboard/Views/UserProfile.vue'
import Reserves         from 'src/components/Dashboard/Views/Reserves.vue'
import Reserve          from 'src/components/Dashboard/Views/Reserve/Reserve.vue'
import Equipments       from 'src/components/Dashboard/Views/Equipment.vue'
import Pendents         from 'src/components/Dashboard/Views/Pendents.vue'
import Reports          from 'src/components/Dashboard/Views/Reports.vue'
import Form             from 'src/components/ReserveClass/Form.vue'
import ReserveEquipment from 'src/components/ReserveEquipment/Equipment.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'reserves',
        name: 'Reserves',
        component: Reserves,
      },
      {
        path: 'reserveclass',
        name: 'ReserveClass',
        component: Form
      },
      {
        path: 'new_reserve',
        name: 'New_Reserve',
        component: Reserve
      },
      {
        path: 'equipment',
        name: 'Equipment',
        component: Equipments
      },
      {
        path: 'reserveEquipment',
        name: 'reserveEquipment',
        component: ReserveEquipment
      },
      {
        path: 'pendents',
        name: 'pendentsReserves',
        component: Pendents
      },
      {
        path: 'reports',
        name: 'Reports',
        component: Reports
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
