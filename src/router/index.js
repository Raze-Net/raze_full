import Vue from 'vue'
import VueRouter from 'vue-router'
// import { hideLoading, showLoading } from '../loading'
import razeApp from '../razeClient';

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

// 校验客户端状态，
// 调用client.login

const AccountRouter = ['/']
router.beforeEach(async (to, from, next) => {
    // 这里要把razeApp所有的client 都要校验一遍， 确保所有都client都没有 就跳转到首页
    if (!AccountRouter.includes(to.path) && !razeApp.razeClient) {
        Vue.prototype.$message("Please Init Your Client By Click On The Card Below!");
        next('/');
        return 
    }
    next();
})

export default router
