import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@renderer/views/home/Home.vue'
import Login from '@renderer/views/login/Login.vue'
import Config from '@renderer/views/config/Config.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
