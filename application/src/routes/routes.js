import DashboardLayout  from '../components/Dashboard/Layout/DashboardLayout.vue'

// ReadOnly Views
import Reserves         from 'src/components/Dashboard/Views/Reserves.vue'

// GeneralViews
import NotFound         from '../components/GeneralViews/NotFoundPage.vue'
import Reserve          from 'src/components/Dashboard/Views/Reserve/Reserve.vue'
import Form             from 'src/components/ReserveClass/Form.vue'
import Login            from '../components/GeneralViews/Login.vue'
import Register            from '../components/GeneralViews/Registration.vue'

// Admin pages
import Overview         from 'src/components/Dashboard/Views/Overview.vue'
import UsersManager     from 'src/components/Dashboard/Views/UserProfile.vue'
import Equipments       from 'src/components/Dashboard/Views/Equipment.vue'
import Pendents         from 'src/components/Dashboard/Views/Pendents.vue'
import Reports          from 'src/components/Dashboard/Views/Reports.vue'
import EquipmentManager from 'src/components/ReserveEquipment/Equipment.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta:{
            permissions:[
                {
                    role: 'guest',
                    access: true
                },
                {
                    role: 'admin',
                    access: false,
                    redirect: 'Overview'
                },
                {
                    role: 'standard',
                    access: false,
                    redirect: 'Overview'
                }
            ]
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta:{
            permissions:[
                {
                    role: 'guest',
                    access: true
                },
                {
                    role: 'admin',
                    access: false,
                    redirect: 'Overview'
                },
                {
                    role: 'standard',
                    access: false,
                    redirect: 'Overview'
                }
            ]
        }
    },
    {
        path: '/',
        component: DashboardLayout,
        redirect: '/general/overview'
    },
    {
        path: '/general',
        name: 'General',
        component: DashboardLayout,
        redirect: '/general/overview',
        children: [
            {
                path: 'overview',
                name: 'Overview',
                component: Overview,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: (user) => user.emailVerified,
                            redirect: 'Login'
                        },
                        {
                            role: 'guest',
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'reserves',
                name: 'Reserves',
                component: Reserves,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: true,
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'reserveclass',
                name: 'ReserveClass',
                component: Form,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: true,
                        },
                        {
                            role: 'guest',
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'new_reserve',
                name: 'New_Reserve',
                component: Reserve,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: true,
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'pendents',
                name: 'pendentsReserves',
                component: Pendents,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: true,
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'equipment',
                name: 'Equipment',
                component: Equipments,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: true,
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
        ]
    },
    {
        path: '/admin',
        component: DashboardLayout,
        redirect: '/general/overview',
        children: [
            {
                path: 'usersManager',
                name: 'UsersManager',
                component: UsersManager,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: false,
                            redirect: 'General'
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'equipmentManager',
                name: 'EquipmentManager',
                component: EquipmentManager,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: false,
                            redirect: 'General'
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
            {
                path: 'reports',
                name: 'Reports',
                component: Reports,
                meta: {
                    permissions: [
                        {
                            role: 'admin',
                            access: true
                        },
                        {
                            role: 'standard',
                            access: false,
                            redirect: 'General'
                        },
                        {
                            role: "guest",
                            access: false,
                            redirect: 'Login'
                        }
                    ]
                }
            },
        ]
    },
    {
        path: '*',
        component: DashboardLayout,
        redirect: '/general/overview'
    }
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
