import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录 找回密码
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/retrieve',
    component: () => import('@/views/login/Retrieve.vue')
  },
  // 经销商入驻
  {
    path: '/mobile',
    component: () => import('@/views/settledIn/Mobile.vue')
  },
  {
    path: '/agreement',
    component: () => import('@/views/settledIn/Agreement.vue')
  },
  {
    path: '/company',
    component: () => import('@/views/settledIn/Company.vue')
  },
  {
    path: '/all',
    component: () => import('@/views/settledIn/All.vue')
  },
  // 首页
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    // redirect: '/welcome',
    children: [
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 不需要token的页面
  const menus = ['/login', '/retrieve', '/mobile', '/agreement', '/company', '/all']
  if (menus.includes(to.path)) return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
