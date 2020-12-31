class Auth {
    
   getUsuarios(){
      return new Promise((resolve, reject) => {
         const usuarios= JSON.parse(localStorage.getItem('usuarios'))
         
         if (!usuarios) {
            reject(new Error('No se encontró'))
         } else {
             var datos=[]
             for (var i=0; i<= usuarios.length ; i++){
               var x=[]
               //console.log(usuarios[i].nombre)
               x.push(usuarios[i].id);
               x.push(usuarios[i].nombre);
               x.push(usuarios[i].usuario);
               x.push(usuarios[i].rol)
               datos.push(x);
             }
             resolve(datos)
         }
      })
   }
     
        
 
    /*login(usuario, pass) {  
       console.log('entra')
     }
 
    guardar(usuData) {  localStorage.setItem("usuario", JSON.stringify(mi_objeto)); }
 
    actualizar(usuData) {   }
    
    borrar(id){ } 
 
    getPorId(id) {}
 
    getPerfil() {}*/
 }
 
 export default new Auth()
 