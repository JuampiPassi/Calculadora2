
import md5 from 'js-md5'
class Auth {
    
   getUsuarios(){
      return new Promise((resolve, reject) => {
         const usuarios= JSON.parse(localStorage.getItem('usuarios'))
         
         if (!usuarios) {
            reject(new Error('No se encontró'))
         } else {
             var datos=[]
             for (var i=0; i<usuarios.length ; i++){
               var x={
                  id: '',
                  nombre: '',
                  usuario: '',
                  rol: '',
               };
               x.id=usuarios[i].id;
               x.nombre=usuarios[i].nombre;
               x.usuario=usuarios[i].usuario;
               x.rol=usuarios[i].rol;
               datos.push(x);
             }
             resolve(datos)
             resolve(usuarios)
         }
      })
   }
     
    login(usuario, pass) {  
       //console.log(usuario, pass)
       return new Promise((resolve, reject)=>{
         const usuarios= JSON.parse(localStorage.getItem('usuarios'))
         const encontrado=usuarios.find(item => item.usuario === usuario)
         if(encontrado!= undefined){
            if(encontrado.contraseña===pass){
               const user= {id: encontrado.id, nombre: encontrado.nombre, usuario: encontrado.usuario, rol: encontrado.rol}
               localStorage.setItem('datosUsuario', JSON.stringify(user))
               resolve(user)
            }else{
               reject(new Error('Contraseña incorrecta'))
            }
         }else{
            reject(new Error('Usuario incorrecto'))
         }
      })
   }
 
   guardar(usuData) {  
      return new Promise ((resolve, reject) =>{
         const usuarios= JSON.parse(localStorage.getItem('usuarios'))
         const encontrado=usuarios.find(item => item.usuario === usuData.usuario)
         if(encontrado!= undefined){
            reject(new Error('Nombre de usuario no disponible'))
         }else if (usuData.rol !== 'Administrador' && usuData.rol !== 'Usuario'){
            reject(new Error('Rol no valido'))
         }else{
            const Arrayusuarios= JSON.parse(localStorage.getItem('usuarios'))//obtengo el array de usuarios 
            Arrayusuarios.push(usuData)//inserto el nuevo usuario en el array
            localStorage.setItem('usuarios', JSON.stringify(Arrayusuarios))//reemplazo el array en el localstorage
            resolve(usuData)
         }
      })
   }
   getPorId(id){
      return new Promise((resolve, reject) =>{
         const usuarios= JSON.parse(localStorage.getItem('usuarios'))
         const encontrado=usuarios.find(item => item.id === id)
         if(encontrado!= undefined){
            resolve(encontrado)
         }else{
            reject(new Error('Usuario no encontrado'))
         }
      })
   }
 
   borrar(id){ 
      return new Promise((resolve, reject)=>{
         var usuarios= JSON.parse(localStorage.getItem('usuarios'))
         const encontrado=usuarios.find(item => item.id === id)
         if(encontrado!= undefined){
            usuarios=usuarios.filter(item => item.id !== id)//dejo los que sean distintos de ese id
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            resolve()
         }else{
            reject(new Error('Id no encontrado'))
         }
      })
   } 
   getPerfil() {
      return new Promise((resolve, reject)=>{
         const usuarioLogeado= JSON.parse(localStorage.getItem('datosUsuario'))
         if(usuarioLogeado != ''){
            resolve(usuarioLogeado)
         }else{
            reject(new Error('Usuario no encontrado'))
         }
      })
   }
   actualizar(usuData) {
      return new Promise ((resolve, reject) =>{
            usuData.contraseña=md5(usuData.contraseña)
            var usuarios= JSON.parse(localStorage.getItem('usuarios'))
            usuarios=usuarios.map(item => item.id === usuData.id ? usuData : item)
            var usuarioLogueado = JSON.parse(localStorage.getItem('datosUsuario'))
            if (usuarios){
               localStorage.setItem('usuarios', JSON.stringify(usuarios))
               if(usuarioLogueado.id===usuData.id){
                  localStorage.setItem('datosUsuario', JSON.stringify(usuData))
               }
               resolve(usuData)
            }else{
               reject(new Error('Error'))
            }
            
      })
   }
}
 
 export default new Auth()
 