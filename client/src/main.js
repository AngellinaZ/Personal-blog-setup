import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
// import axios from 'axios'               // 异步接口sss
import App from './App'                 // 入口页面
import routes from './router/index'     // 路由
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'  //markdown编辑
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'


import './assets/common/common.css'


// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter)
Vue.use(mavonEditor)
Vue.use(ElementUI)


// 1. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production',
    routes,
    scrollBehavior (to, from, savedPosition) {
      // 定位到上次滚动地方
      if (savedPosition) {
        //return savedPosition // 官方
        setTimeout(() => {
            window.scrollTo(savedPosition.x, savedPosition.y)
        }, 200)
      } else {
        return { x: 0, y: 0 }
      }
    }
})

/* 路由拦截 */
router.beforeEach((to, from, next) => {
  next()
})

// 2.创建和挂载根实例
new Vue({
    router,
    template: '<App/>',
    components: { App }
}).$mount('#app')