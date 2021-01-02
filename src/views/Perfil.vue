<template>
  <v-container>
      <h1>Editar perfil</h1>
      <form @submit.prevent="guardar">
        <v-text-field v-model="datosUsuario.nombre"   label="Nombre" required></v-text-field>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña"   required></v-text-field>
        <v-text-field v-model="contraseña2"  label="Confirmar Contraseña"  required></v-text-field>
       

        <v-btn class="mr-4" type="submit" color="info" :disabled='bloquear'> Guardar </v-btn>
        <v-btn to="/usuarios">Cancelar</v-btn>
      </form>
  </v-container>
</template>

<script>
import Auth from '../services/auth'
export default {
    name: 'perfil',
    data(){
      return{
        datosUsuario: {
              id: '',
              nombre: '',
              usuario: '',
              rol: '',
              contraseña: ''
          },
          contraseña2: ''
      }
    },
    computed:{
      bloquear(){
        return this.datosUsuario.nombre.trim()=== '' || this.datosUsuario.contraseña==='' ||  this.datosUsuario.contraseña !== this.contraseña2
      }
    },
    methods:{
      guardar(){
        Auth.actualizar(this.datosUsuario).then((value)=>{
          console.log('datos actualizados', value)
      });
        this.datosUsuario={
              id: '',
              nombre: '',
              usuario: '',
              rol: '',
              contraseña: ''
          },
          this.contraseña2=''
      }
     
    },
    created(){
      Auth.getPerfil().then((value)=>{
        this.datosUsuario.id=value.id,
        this.datosUsuario.nombre=value.nombre,
        this.datosUsuario.usuario=value.usuario,
        this.datosUsuario.rol=value.rol
      })
    }
}
</script>

<style>

</style>