<template>
  <v-container>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <v-text-field v-model="usuario"  label="Usuario" required></v-text-field>
        <v-text-field v-model="contraseña"  label="Contraseña" type="password" required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear' color="info"> Login </v-btn>
        <v-btn to="/">Cancelar</v-btn>
      </form>
  </v-container>
</template>

<script>
import Auth from '../services/auth'
import md5 from 'js-md5'
export default {
 name: 'login',
 data(){
     return{
      usuario: '',
      contraseña: '',
     }
 },
 computed: {
     bloquear(){
          return  this.usuario==='' || this.contraseña==='' ? true: false;
      },
 },
 methods: {
      login(){
        var pass=md5(this.contraseña)
        Auth.login(this.usuario, pass).then((value)=>{
              this.$store.state.datosUsuario=value
         });
      }
 },
}
</script>

