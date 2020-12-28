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
        <v-btn to="/usuarios">Cancelar</v-btn>
      </form>
    </template>
    <template v-else>
      <h1>Editar Usuario: {{ $route.params.id }} - {{datos}}</h1>
       <form @submit.prevent="editarUsuario">
        <v-text-field v-model="datosUsuario.nombre"   label="Nombre" required></v-text-field>
        <v-text-field v-model="datosUsuario.usuario"  label="Usuario" required></v-text-field>
        <v-select :items="items" v-model="datosUsuario.rol"  label="Rol" required></v-select>
        <v-text-field v-model="datosUsuario.contraseña"  label="Contraseña"  return-object required></v-text-field>
       

        <v-btn class="mr-4" type="submit" color="info" :disabled='bloquear'> Editar </v-btn>
        <v-btn to="/usuarios">Cancelar</v-btn>
      </form>
    </template>
  </v-container>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
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
      ...mapActions(['guardar','editarDato', 'editarUsuario', 'comprobarNombre']),
      submit(){
            
            if(this.comprobarNombre(this.datosUsuario.usuario)){
              alert('el nombre de usuario ya existe')
            }else{
              //generar id
              this.datosUsuario.id= shortid.generate()
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
            }
          },
      },

  computed:{
      ...mapState(['datos']),
      ...mapGetters(['comprobarNombre']),
      bloquear(){
          return this.datosUsuario.nombre.trim()=== '' || this.datosUsuario.usuario==='' || this.datosUsuario.rol==='' || this.datosUsuario.contraseña==='' ? true: false;
      },
  },
  created(){
      if(this.$route.params.id != -1){
      this.editarDato(this.$route.params.id)
      this.datosUsuario=this.datos
      }
  }
};
</script>
