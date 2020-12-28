import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/UsuariosList.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.esAdmin()){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/usuarios/:id',
    name: 'Editar',
    component: () => import('../views/UsuarioEdit.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.esAdmin()){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogged()){
        next(false)
      }else{
        next()
      }
    }
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.isLogged()){
        next()
      }else{
        next(false)
      }
    }
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


/*router.beforeEach((to, from, next) => {
  
  if (to.path=='Login'){
    /*if (store.getters.isLogged){
      next('/')
    }else{
      next()
    }next()
    
  }
});
router.beforeEach((to, from, next) => {
  
  if(to.name=='Perfil'){
    const x=store.getters.isLogged()
    alert(x)
    if (x){
      next('/')
    }else{
      next()
    }
  }
});

 /* if(to.name=='Home'){
    next()
  }
  if(to.name=='Editar'){
    next()
  }
  if(to.name=='Usuarios'){
    next()
  }*/

 /* if(to.path == '/usuarios/:id'){
    if (to.path == '/usuarios/-1'){
      next()
    }else if(store.getters.esAdmin){
      next()
    }else{
      next('/')
    }
  }*/

export default router
