<template>
  <v-container>
      <h1>Login</h1>
      <form @submit.prevent="login(user)">
        <v-text-field v-model="user.usuario"  label="Usuario" required></v-text-field>
        <v-text-field v-model="user.contraseña"  label="Contraseña" type="password" required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear' color="info"> Login </v-btn>
        <v-btn to="/">Cancelar</v-btn>
      </form>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
 name: 'login',
 data(){
     return{
       user:{
         usuario: '',
         contraseña: ''
       }
     }
 },
 computed: {
     bloquear(){
          return  this.user.usuario==='' || this.user.contraseña==='' ? true: false;
      },
 },
 methods: {
      ...mapActions(['login']),
 }
}
</script>

