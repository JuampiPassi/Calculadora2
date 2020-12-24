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
    cargar(state, payload){
      state.usuarios= payload
    },
    set(state, payload){
      state.usuarios.push(payload)
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
      router.push('/usuarios');
    },
    eliminar (state, payload){
      state.usuarios=state.usuarios.filter(item => item.id !== payload)
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
    },
     buscar(state, payload){
       if(! state.usuarios.find(item => item.id === payload)){
         router.push('/usuarios');
       }else{
      state.datos= state.usuarios.find(item => item.id === payload)
       }
    },
    update(state, payload){
      state.usuarios=state.usuarios.map(item => item.id === payload.id ? payload : item)//si el id coincide con el id del objeto modificado, lo reemplazo
      router.push('/usuarios')
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      if(localStorage.getItem('usuarios')){
        const usuarios= JSON.parse(localStorage.getItem('usuarios'))
        commit('cargar', usuarios)
        return
      }
      localStorage.setItem('usuarios', JSON.stringify([]))
    },
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
