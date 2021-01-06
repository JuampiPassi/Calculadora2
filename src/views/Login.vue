<template>
  <v-container>
      <h1>Login</h1>
      <form @submit.prevent="logIn">
        <v-text-field v-model="usuario.usuario"  label="Usuario" required></v-text-field>
        <v-text-field v-model="usuario.contraseña"  label="Contraseña" type="password" required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear' color="info"> Login </v-btn>
        <v-btn to="/">Cancelar</v-btn>
      </form>
      <v-alert color="red" dense dismissible elevation="1" icon="mdi-alert" type="error" v-model="alert" class="mt-5">Usuario o contraseña incorrecto</v-alert>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
 name: 'login',
 data(){
     return{
       usuario:{
         usuario: '',
        contraseña: '',
       },
      alert: false
     }
 },
 computed: {
     bloquear(){
          return  this.usuario.usuario==='' || this.usuario.contraseña==='' ? true: false;
      },
 },
 methods: {
   ...mapActions(['login']),
       async logIn(){
         await this.login(this.usuario).then((value)=>{
           if (value== undefined){
             this.alert=true
           }else{
             this.alert=false
           }
        });
      }
 },
}
</script>

