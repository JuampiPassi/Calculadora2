
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios:[],
    datosUsuario:[],
  },
  mutations: {
   /* cargar(state, payload){
      state.usuarios= payload
    },
    cargarUsuarioLogeado(state, payload){
      state.usuarioLogeado= payload
    },*/
    cargarUsuario(state){//crea el array en el localstorage
      if(! localStorage.getItem('datosUsuario')){
      localStorage.setItem('datosUsuario', JSON.stringify(state.datosUsuario))
      }else{
        state.datosUsuario=JSON.parse(localStorage.getItem('datosUsuario'))
      }
      if(! localStorage.getItem('usuarios')){
      localStorage.setItem('usuarios', JSON.stringify([]))
      }
    },
    /*set(state, payload){
      state.usuarios.push(payload)
      //console.log(payload)
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
      router.push('/usuarios');
    },
    eliminar (state, payload){
      state.usuarios=state.usuarios.filter(item => item.id !== payload)
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
    },/*
     buscar(state, payload){
       if(! state.usuarios.find(item => item.id === payload)){
         router.push('/usuarios');
       }else{
      state.datos= state.usuarios.find(item => item.id === payload)
       }
    },*/
    update(state, payload){
      state.usuarios=state.usuarios.map(item => item.id === payload.id ? payload : item)//si el id coincide con el id del objeto modificado, lo reemplazo
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
      router.push('/usuarios')
    },
    editarPerfil(state, payload){
      
      state.usuarios=state.usuarios.map(item => item.id === payload.id ? payload : item)
      localStorage.setItem('usuarios', JSON.stringify(state.usuarios))
      state.usuarioLogeado= payload
      localStorage.setItem('usuarioLogeado', JSON.stringify(state.usuarioLogeado))
      router.push('/usuarios')

    },
    /*user_login(state, payload){//guardo en el store los datos del usuario logeado
      console.log('desde el store: ', payload)
      //state.datosUsuario.push(payload)
    },*/

    logoutUser(state){//salir
      state.datosUsuario= []
      localStorage.setItem('datosUsuario', JSON.stringify([]))
    },
  },
  actions: {
   /* cargarLocalStorage({commit}){
      if(localStorage.getItem('usuarios')){
        const usuarios= JSON.parse(localStorage.getItem('usuarios'))
        commit('cargar', usuarios)
      }else{
        localStorage.setItem('usuarios', JSON.stringify([]))
      }

      if(localStorage.getItem('usuarioLogeado')){
        const usuarioLogeado= JSON.parse(localStorage.getItem('usuarioLogeado'))
        commit('cargarUsuarioLogeado', usuarioLogeado)
      }else{
        localStorage.setItem('usuarioLogeado', JSON.stringify([]))
      }
      
    },
    guardar({commit}, datos){
      commit('set', datos)
    },
    deleteUsuario({commit}, id){
      commit('eliminar', id)
    },
    /*editarDato({commit}, id){
      commit ('buscar', id)
    },*/
    editarUsuario({commit}, editado){//le paso a update el objeto modificado
      commit('update',editado )
    },
    editarPerfil({commit}, dato){
      commit('editarPerfil', dato)
    },
    /*login({commit}, user){//recibe nombre de usuario y pass
      commit('user_login', user)
    },*/
    logout({commit}){
      commit('logoutUser')
    },
    cargarUsuario({commit}){//inicializa el array de usuario logeado en el localstorage
      commit('cargarUsuario')
    }
   
  },
  modules: {
  },
  getters:{
    /*comprobarNombre: (state) => (nombre) => {
      if(state.usuarios.find(item => item.usuario === nombre)){
        return true
      }else{
        return false
      }
    },*/
    esAdmin: (state) =>() =>{
      if(state.datosUsuario != '' && state.datosUsuario.rol=== 'Administrador'){
        return true
      }else{
        return false
      }
    },
    isLogged: (state) =>() =>{
      if(state.datosUsuario.rol === 'Administrador' || state.datosUsuario.rol === 'Usuario' ){
        return true
      }else{
        return false
      }
    }
  }
})
