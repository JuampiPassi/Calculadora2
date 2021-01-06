import Auth from '../../src/services/auth'
import {jest} from '@jest/globals'
import 'jest-localstorage-mock';

describe('Auth Service', () => {
  
    beforeEach(() => {
  
      
    })
  
    it('Si pasa usuario y contraseña válido, me devuelve lo los datos de ese usuario', () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return [
          {id: 1, nombre: 'Admin', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ]
      })
      // llamar al login 
      let result =  Auth.login('admin', '81dc9bdb52d04dc20036dbd8313ed055')
      // verificar el resultado de login que se coresponda con el usuario que se pasa
      
      expect(localStorage.getItem).toBeCalledTimes(1)
      expect(result.pass).toBeNull
      expect(result).toBe('Admin')
      expect(result.id).toBe(1)
      expect(result.usuario).toBe('admin')
      expect(result.rol).toBe('Administrador')
  
    }),
    it('Devuelve los datos de los usuarios del localstorage', () => {
      // mock de localstorage.getItem
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        return [
          {id: 1, nombre: 'Admin', usuario: 'admin', rol: 'Administrador', pass: '81dc9bdb52d04dc20036dbd8313ed055'}
        ]
      })
      // llamar al login 
      let result = Auth.getUsuarios()
      // verificar el resultado de login que se coresponda con el usuario que se pasa
      
      expect(result).toBe('Admin')
      expect(localStorage.getItem).toBeCalledTimes(1)
      expect(result.pass).toBeNull
      expect(result.id).toBe(1)
      expect(result.usuario).toBe('admin')
      expect(result.rol).toBe('Administrador')
  
    })
})