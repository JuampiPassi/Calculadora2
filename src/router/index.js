import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('../views/UsuariosList.vue')
  },
  {
    path: '/usuarios/:id',
    name: 'Editar',
    component: () => import('../views/UsuarioEdit.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
