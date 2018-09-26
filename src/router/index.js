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
  }]
})

router.beforeEach(function(to,from,next){
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
})