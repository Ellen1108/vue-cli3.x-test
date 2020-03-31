import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
// 按需 引入 Home 组件
// const Home = resolve => {
//   require.ensure(['../views/Home.vue'], () => {
//     resolve(require('../views/Home.vue'))
//   })
// }
// 按需 引入 Home 组件
const Home = () => import('../views/Home.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
let base = `${process.env.BASE_URL}` // 动态获取二级目录 使用配置中的 BASE_URL 来设置路由的 base 参数：

const router = new VueRouter({
  mode: 'history',
  base: base,
  routes: routes
})

export default router
