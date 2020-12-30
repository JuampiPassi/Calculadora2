
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios:[],
    datos:{
      id: '',
      nombre: '',
      usuario: '',
      rol: '',
      contraseña: ''
    },
    usuarioLogeado:[]
  },
  mutations: {
    cargar(state, payload){
      state.usuarios= payload
    },
    cargarUsuarioLogeado(state, payload){
      state.usuarioLogeado= payload
    },
    set(state, payload){
      state.usuarios.push(payload)
      //console.log(payload)
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
    user_login(state, payload){
      
      if(state.usuarios.find(item => item.usuario === payload.usuario)){
        const encontrado = state.usuarios.find(item => item.usuario === payload.usuario)
        if(encontrado.contraseña===payload.contraseña){
          state.usuarioLogeado=encontrado
          localStorage.setItem('usuarioLogeado', JSON.stringify(state.usuarioLogeado))
          console.log('bienvenido')
          router.push('/')
        }else{
          alert('Contraseña incorrecta')
        }
      }else{
        alert('Usuario incorrecto')
      }
    },
    logoutUser(state){
      state.usuarioLogeado= ''
      //localStorage.removeItem('usuarioLogeado')
      localStorage.setItem('usuarioLogeado', JSON.stringify(state.usuarioLogeado))
      router.push('/')
    },
  },
  actions: {
    cargarLocalStorage({commit}){
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
    editarDato({commit}, id){
      commit ('buscar', id)
    },
    editarUsuario({commit}, editado){//le paso a update el objeto modificado
      commit('update',editado )
    },
    editarPerfil({commit}, dato){
      commit('editarPerfil', dato)
    },
    login({commit}, user){
      commit('user_login', user)
    },
    logout({commit}){
      commit('logoutUser')
    },
   
  },
  modules: {
  },
  getters:{
    comprobarNombre: (state) => (nombre) => {
      if(state.usuarios.find(item => item.usuario === nombre)){
        return true
      }else{
        return false
      }
    },
    esAdmin: (state) =>() =>{
      if(state.usuarioLogeado != '' && state.usuarioLogeado.rol=== 'Administrador'){
        return true
      }else{
        return false
      }
    },
    isLogged: (state) =>() =>{
      if(state.usuarioLogeado.rol === 'Administrador' || state.usuarioLogeado.rol === 'Usuario' ){
        return true
      }else{
        return false
      }
    }
  }
})
