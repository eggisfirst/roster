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
    component: resolve => require(['../pages/province'], resolve),
    meta:{
      title:'广东省'
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

