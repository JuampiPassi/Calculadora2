<template>
  <v-app>
    <div>
      <v-app-bar dark accent-4 flat color="blue">
        <v-app-bar-nav-icon ></v-app-bar-nav-icon>
        <v-toolbar-title color="white">Vuetify</v-toolbar-title>
          <v-spacer></v-spacer>
          <template v-if="this.$store.state.datosUsuario == '' ">
            <v-btn color="secondary" class="mr-3" :to="{name : 'Login'}">Login</v-btn>
          </template>
          <template v-else>
            <v-toolbar-title color="white">{{this.$store.state.datosUsuario.nombre}} - {{this.$store.state.datosUsuario.rol}}</v-toolbar-title>
            <v-btn color="secondary" :to="{name: 'Perfil'}" class="ml-3">Perfil</v-btn>
            <v-btn color="error" @click="salir" class="ml-3">Salir</v-btn>
          </template>
          
      </v-app-bar>

    </div>
    <v-container style="text-align: center">
      
      <router-link to="/" active-class="active">Home</router-link> |
      <router-link to="/usuarios/-1" active-class="active">Nuevo Usuario</router-link> |
      <router-link to="/usuarios">Lista de Usuarios</router-link>
      
  </v-container>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'


export default {
  name: "App",

  components: {
  },

  data(){
    return{
    
    
    }
  },
  methods:{
    ...mapActions(['logout', 'cargarUsuario']),
    
    salir(){
      this.logout()
    }
  },
  computed:{
  },
  created(){
    this.cargarUsuario()
  }
};
</script>
<style scoped>

</style>
