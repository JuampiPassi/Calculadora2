import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios:[
      {
        id: 1,
        nombre: "Usario 1",
        usuario: "usuario",
        rol: 'Usuario',
        contraseña: '1234'
      },
      {
        id: 2,
        nombre: 'Administrador',
        usuario: 'admin',
        rol: 'Administrador',
        contraseña: '789456'
      }
    ],
    datos:{
      nombre: '',
      usuario: '',
      rol: '',
      contraseña: ''
    },
  },
  mutations: {
    set(state, payload){
      state.usuarios.push(payload)
    },
    eliminar (state, payload){
      state.usuarios=state.usuarios.filter(item => item.id !== payload)
    },
     buscar(state, payload){
      state.datos= state.usuarios.find(item => item.id === payload)
    },
    update(state, payload){
      state.usuarios=state.usuarios.map(item => item.id === payload.id ? payload : item)//si el id coincide con el id del objeto modificado, lo reemplazo
      router.push('/usuarios')
    }
  },
  actions: {
    guardar({commit}, datos){
      commit('set', datos)
    },
    deleteUsuario({commit}, id){
      commit('eliminar', id)
    },
    editarDato({commit}, id){
      commit ('buscar', id)
    },
    editarUsuario({commit}, editado){//le paso a update el objeto modificado
      commit('update',editado )
    }
  },
  modules: {
  }
})
