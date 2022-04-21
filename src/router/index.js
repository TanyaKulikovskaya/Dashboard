import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('../components/TheLayout.vue')
const Dashboard = () => import('../views/DashboardView.vue')
const Analytics = () => import('../views/AnalyticsView.vue')
const Settings = () => import('../views/SettingsView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: '/analytics',
        name: 'analytics',
        component: Analytics,
      },
      {
        path: '/settings',
        name: 'settings',
        component: Settings,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
