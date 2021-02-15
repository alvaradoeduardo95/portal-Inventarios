import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AltaClienteModel } from '../models/altaCliente.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class ClientesService {
  
  // Dirección de BD
  private urlClientes = 'https://portalinventarios-default-rtdb.firebaseio.com';
  private urlClientes2 = 'https://portalinventarios-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }

  // Obtener clientes
  getCustomer( id: string ) {
  return this.http.get(`${ this.urlClientes }/clientes/${ id }.json`);
  }

  // Crear nuevo cliente
  createCustomer( cliente: AltaClienteModel ){
    return this.http.post(`${ this.urlClientes }/clientes.json`, cliente)
    .pipe(
      map((resp: any) => {
        cliente.id = resp.name;
        return cliente;
      }));
   }

   // Borrar cliente
   deleteCustomer( id: string ) {
      return this.http.delete(`${ this.urlClientes }/clientes/${ id }.json`);
   }

  // Actualizar cliente
   updateCustomer( cliente: AltaClienteModel ){
      // Se crea una copia del cliente a actualizar
      console.log(cliente.flag_bloqueo)
      const clienteTemp = {
        ...cliente
      };
      // Eliminar el ID de la copia del cliente para que no se cree una nueva propiedad
      delete clienteTemp.id;

      // Actualizar la información del cliente
      return this.http.put(`${ this.urlClientes }/clientes/${ cliente.id }.json`, clienteTemp);
   }

   // Obtener lista de transportes
   getCustomerList(){
     return this.http.get(`${ this.urlClientes }/clientes.json`)
       .pipe( map( this.transformObjectToArray ) );
   }

   // Transformación para regresar un arreglo en lugar de objeto
   private transformObjectToArray( clientesObj: object ){

    // Constante para recolectar solo las propiedades del objeto que necesitamos
     const CLIENTES: AltaClienteModel[] = [];

     // Validar que el objeto no venga vacío
     if ( clientesObj !== null ) {
      Object.keys( clientesObj ).forEach( key => {
        const CLIENTE: AltaClienteModel = clientesObj[key];
        CLIENTE.id = key;

        CLIENTES.push( CLIENTE );
      });
     }

    // Si no hay información se retorna arreglo vacío
     if ( clientesObj === null ) { return []; }
     CLIENTES.sort( (a, b) => {
      return a.id < b.id ? 1 : -1; } );
      return CLIENTES;

   }
}
