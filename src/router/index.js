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
    meta: { adminRequired: true }
   
  },
  {
    path: '/usuarios/:id',
    name: 'Editar',
    component: () => import('../views/UsuarioEdit.vue'),
    meta: { isLogged: true },
   
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue'),
    meta: { isLogged: true },
   
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if ((to.meta.adminRequired && !store.getters.esAdmin()) ||
    (to.meta.isLogged && !store.getters.isLogged())){
      next('/login')
    }else{
      next()
    }

    if(to.path=='/usuarios/:id'){
      if(to.path=='/usuarios/-1'){
        next()
      }
      else if (store.getters.esAdmin()){
        next()
      }else{
        next(false)
      }
    }

    if(to.path=='/login'){
      if(store.getters.isLogged()){
        next(false)
      }else{
        next()
      }
    }
})

export default router
