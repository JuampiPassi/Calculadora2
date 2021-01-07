import Auth from '../../src/services/auth'
import {jest} from '@jest/globals'
import 'jest-localstorage-mock';

describe('Auth Service', () => {
  
    beforeEach(() => {
  
      
    })
  
    it('Si pasa usuario y contraseña válido, me devuelve lo los datos de ese usuario', async() => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 1, nombre: 'Admin', usuario: 'admin', rol: 'Administrador', contraseña: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      // llamar al login 
      let result =  await Auth.login('admin', '1234')
      // verificar el resultado de login que se coresponda con el usuario que se pasa
      
      expect(result.id).toBe(1)
      expect(result.nombre).toBe('Admin')
      expect(result.usuario).toBe('admin')
      expect(result.rol).toBe('Administrador')
      expect(result.contraseña).toBeNull//verificar que no se devuelva el password
      expect(localStorage.getItem).toBeCalledTimes(1)
  
    }),
    it('Devuelve los datos de los usuarios del localstorage', async () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 1, nombre: 'Usuario 1', usuario: 'Usuario', rol: 'Usuario', pass: '81dc9bdb52d04dc20036dbd8313ed055'},
          {id: 2, nombre: 'Administrador', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      // llamar al getUsuarios
      let result =  await Auth.getUsuarios()
      // verificar el resultado de login que se coresponda con el usuario que se pasa
      
      expect(result[0].id).toBe(1)
      expect(result[0].nombre).toBe('Usuario 1')
      expect(result[0].usuario).toBe('Usuario')
      expect(result[0].rol).toBe('Usuario')
      expect(result[0].pass).toBeNull//que no devuelva el password del usuario
      expect(result[1].id).toBe(2)
      expect(result[1].nombre).toBe('Administrador')
      expect(result[1].usuario).toBe('admin')
      expect(result[1].rol).toBe('Administrador')
      expect(result[1].pass).toBeNull//que no devuelva el password del usuario
      expect(result).toEqual(expect.any(Array))//Verificar que devuelva un array
      expect(result).toHaveLength(2)//verificar que contenga 2 objetos
  
    })

    it('Guarda el usuario y devuelve los datos del mismo', async () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 1, nombre: 'Usuario 1', usuario: 'Usuario', rol: 'Usuario', pass: '81dc9bdb52d04dc20036dbd8313ed055'},
          {id: 2, nombre: 'Administrador', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      let result =  await Auth.guardar({id: 5, nombre: 'usuario 2', usuario: 'usuario 2', rol: 'Usuario', contraseña: '1234'})

      expect(result.id).toBe(5)
      expect(result.nombre).toBe('usuario 2')
      expect(result.usuario).toBe('usuario 2')
      expect(result.rol).toBe('Usuario')
    })

    it('Actualiza los datos de un usuario y devuelve los datos actualizados', async () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 1, nombre: 'Usuario 1', usuario: 'Usuario', rol: 'Usuario', pass: '81dc9bdb52d04dc20036dbd8313ed055'},
          {id: 2, nombre: 'Administrador', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      let result =  await Auth.actualizar({id: 2, nombre: 'Actualizado', usuario: 'admin', rol: 'Administrador', contraseña: '1234'})

      expect(result.id).toBe(2)
      expect(result.nombre).toBe('Actualizado')
      expect(result.usuario).toBe('admin')
      expect(result.rol).toBe('Administrador')
      expect(result.contraseña).toBe('81dc9bdb52d04dc20036dbd8313ed055')
    })

    it('Obtener los datos del usuario mediante el id', async () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 1, nombre: 'Usuario 1', usuario: 'Usuario', rol: 'Usuario', pass: '81dc9bdb52d04dc20036dbd8313ed055'},
          {id: 2, nombre: 'Administrador', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      let result =  await Auth.getPorId(2)

      expect(result.id).toBe(2)
      expect(result.nombre).toBe('Administrador')
      expect(result.usuario).toBe('admin')
      expect(result.rol).toBe('Administrador')
      expect(result.contraseña).toBeNull
    })

    it('Obtener los datos del usuario logueado', async () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return JSON.stringify([
          {id: 2, nombre: 'Administrador', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ])
      })
      let result =  await Auth.getPerfil()

      expect(result[0].id).toBe(2)
      expect(result[0].nombre).toBe('Administrador')
      expect(result[0].usuario).toBe('admin')
      expect(result[0].rol).toBe('Administrador')
      expect(result[0].contraseña).toBeNull
    })
   
})