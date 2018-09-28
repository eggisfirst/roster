import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export var router = new VueRouter({
  routes: [{
    path: '/',
    name: 'Home',
    component: resolve => require(['../pages/home'], resolve),
    meta:{
      title:'慕思商学院花名册'
    }
  },{
    path: '/province',
    name: 'province',
    component: resolve => require(['../pages/province'], resolve)
  },{
    path: '/series',
    name: 'series',
    component: resolve => require(['../pages/series'], resolve)
  },{
    path: '/personalDetails',
    name: 'personalDetails',
    component: resolve => require(['../pages/personalDetails'], resolve),
    meta:{
      title:'个人信息'
    }
  }
]
})

router.beforeEach((to,from,next) => {
  // console.log('路由元信息to', to)
  // console.log('路由元信息from', from)
  // console.log('路由元信息next', next)
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})

