<template>
    <v-container>
        <v-btn color="info" class="mt-5" :to="{name: 'Editar',params:{id:-1}}">Nuevo Usuario</v-btn>
        <v-row class="mt-3 text-center">
            <v-col>
                <h2>ID</h2>
            </v-col>
            <v-col>
                <h2>Nombre</h2>
            </v-col>
            <v-col>
                <h2>Usuario</h2>
            </v-col>
            <v-col>
                <h2>Rol</h2>
            </v-col>
            <v-col>
                <h2>Acciones</h2>
            </v-col>
        </v-row>
        
        <v-row v-for="item in usuarios" :key="item.id"  class="text-center">
            <v-col>
                <p>{{item.id}}</p>
            </v-col>
            <v-col>
                <p >{{item.nombre}}</p>
            </v-col>
            <v-col>
                <p>{{item.usuario}}</p>
            </v-col>
            <v-col>
                <p>{{item.rol}}</p>
            </v-col>
            <v-col>
                <v-btn color="info" :to="{name: 'Editar',params:{id:item.id}}" >Editar</v-btn>
                <v-btn color="error" class="ml-3" @click="dialog = true, id=item.id" >Eliminar</v-btn><!--@click="deleteUsuario(item.id)-->
                
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" persistent max-width="290">
                    <v-card>
                        <v-card-title class="headline">Eliminar Usuario</v-card-title>
                        <v-card-text>¿Está seguro que desea eliminar el registro id: {{this.id}}?</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="red darken-1" text @click="dialog = false,deleteUsuario(id)">Eliminar</v-btn>
                            <v-btn color="green darken-1" text @click="dialog = false">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                 </v-dialog>
    </v-container>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
    name: 'usuarios',
    data(){
        return{
            dialog: false,
            id: '',
        }
    },

    computed:{
        ...mapState(['usuarios']),
    },
    methods:{
        ...mapActions(['deleteUsuario']),
    },

    
}
</script>