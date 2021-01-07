<template>
  <v-container>
    <template v-if="$route.params.id == -1">
      <h1>Registrar Nuevo Usuario</h1>
      <form @submit.prevent="submit">
        <v-text-field v-model="datosUsuario.nombre"  label="Nombre" required></v-text-field>
        <v-text-field v-model="datosUsuario.usuario"  label="Usuario" required></v-text-field>
        <v-select :items="items" v-model="datosUsuario.rol" label="Rol" required></v-select>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña" type="password" required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear' color="info"> Registrar </v-btn>
        <v-btn to="/">Cancelar</v-btn>
      </form>
    </template>
    <template v-else>
      <h1>Editar Usuario: {{datosUsuario.usuario}}</h1>
       <form @submit.prevent="editar">
        <v-text-field v-model="datosUsuario.nombre"   label="Nombre" required></v-text-field>
        <v-select :items="items" v-model="datosUsuario.rol"  label="Rol" required></v-select>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña"  return-object required></v-text-field>
       

        <v-btn class="mr-4" type="submit" color="info" :disabled='bloquear'> Editar </v-btn>
        <v-btn to="/usuarios">Cancelar</v-btn>
      </form>
    </template>
  </v-container>
</template>

<script>
import Auth from '../services/auth'
const shortid= require('shortid');//generador de id
export default {
  name: "edit",
  data(){
      return{
          items: ['Administrador', 'Usuario'],
          datosUsuario: {
              id: '',
              nombre: '',
              usuario: '',
              rol: '',
              contraseña: ''
          },
         
      }
  },
  
  methods:{
      submit(){
        //generar id
        this.datosUsuario.id= shortid.generate()
        //Convierto la constraseña a md5
        Auth.guardar(this.datosUsuario).then((value)=>{
             console.log('guardar:',value)
         });
        //limpiar datos
        this.datosUsuario={
            id: '',
            nombre: '',
            usuario: '',
            rol: '',
            contraseña: ''
        }
      },
          editar(){
              Auth.actualizar(this.datosUsuario).then((value)=>{
              console.log('Usuario editado: ',value)
         });
              this.datosUsuario={
                  id: '',
                nombre: '',
                usuario: '',
                rol: '',
                contraseña: ''
              }
          }
      },

  computed:{
      bloquear(){
          return this.datosUsuario.nombre.trim()=== '' || this.datosUsuario.usuario==='' || this.datosUsuario.rol==='' || this.datosUsuario.contraseña==='' ? true: false;
      },
  },
  created(){
      if(this.$route.params.id != -1){
      Auth.getPorId(this.$route.params.id).then((value)=>{
             //console.log('datos del usuario:',value)
            this.datosUsuario=value
         });
      }
      
  }
};
</script>
