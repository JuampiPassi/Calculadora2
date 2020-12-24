<template>
  <v-container>
    <template v-if="$route.params.id == -1">
      <h1>Registrar Nuevo Usuario</h1>
      <form @submit.prevent="submit">
        <v-text-field v-model="datosUsuario.nombre"  label="Nombre" required></v-text-field>
        <v-text-field v-model="datosUsuario.usuario"  label="Usuario" required></v-text-field>
        <v-select :items="items" v-model="datosUsuario.rol" label="Rol" required></v-select>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña" type="password" required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear'> Registrar </v-btn>
      </form>
    </template>

    <template v-else>
      <h1>Editar Usuario: {{ $route.params.id }} - {{datos}}</h1>
       <form @submit.prevent="editarUsuario">
        <v-text-field v-model="datosUsuario.nombre"   label="Nombre" required></v-text-field>
        <v-text-field v-model="datosUsuario.usuario"  label="Usuario" required></v-text-field>
        <v-select :items="items" v-model="datosUsuario.rol"  label="Rol" required></v-select>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña"  return-object required></v-text-field>
       

        <v-btn class="mr-4" type="submit" :disabled='bloquear'> Editar </v-btn>
      </form>
    </template>
  </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'
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
      ...mapActions(['guardar']),
      submit(){
          console.log(this.datosUsuario)
            //generar id
            this.datosUsuario.id= shortid.generate()
            console.log(this.datosUsuario.id)
            //enviar los datos
            this.guardar(this.datosUsuario)
            //limpiar datos
            this.datosUsuario={
                id: '',
              nombre: '',
              usuario: '',
              rol: '',
              contraseña: ''
            }

          },
         ...mapActions(['editarDato', 'editarUsuario']),
      },

  computed:{
      bloquear(){
          return this.datosUsuario.nombre.trim()=== '' || this.datosUsuario.usuario==='' || this.datosUsuario.rol==='' || this.datosUsuario.contraseña==='' ? true: false;
      },
      ...mapState(['datos']),
  },
  created(){
      this.editarDato(this.$route.params.id)
      this.datosUsuario=this.datos
      
  }
};
</script>
