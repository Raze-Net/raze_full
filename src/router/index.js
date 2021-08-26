import Vue from 'vue'
import VueRouter from 'vue-router'
// import { hideLoading, showLoading } from '../loading'
import razeApp from '../razeClient'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  }, 
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/select',
    name: 'Select',
    component: () => import(/* webpackChunkName: "select" */ '../views/Select.vue')
  },
  {
    path: '/process',
    name: 'Process',
    component: () => import(/* webpackChunkName: "Process" */ '../views/Process.vue')
  },

]

const router = new VueRouter({
  routes
})

// Check the client state，
// Invoke client.login

const AccountRouter = ['/']
router.beforeEach(async (to, from, next) => {
    // Check all the clients of razeApp
    if (!AccountRouter.includes(to.path) && !razeApp.razeClient) {
        next('/')
        return 
    }
    next()
})

export default router
