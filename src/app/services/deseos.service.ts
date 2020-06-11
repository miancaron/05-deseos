import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() { 

    this.cargarStorage();

    // const lista1 = new Lista('Recolectar piedras del infinito');
    // const lista2 = new Lista('Héroes a desaparecer');

    // this.listas.push(lista1, lista2);

  }

  crearLista( titulo: string ) {

    const nuevaLista = new Lista( titulo );
    this.listas.push( nuevaLista );
    this.guardarStorage();

    return nuevaLista.id;

  }

  borrarLista( lista: Lista ){

    // Para borrar una lista concreta -> filtramos todas las listas menos la que queremos borrar
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );

    this.guardarStorage();
    
  }

  obtenerLista( id: string | number ) {

    // Convertir a number
    id = Number(id);

    // find devuelve el primer elemento de la lista que cumple la condición
    // return this.listas.find( listaData => {
    //   return listaData.id === id;
    // } );

    return this.listas.find( listaData => listaData.id === id );

  }

  guardarStorage() {

    // JSON.stringify -> convierte un objeto a un JSON (string)
    localStorage.setItem( 'data', JSON.stringify(this.listas) );

  }

  cargarStorage() {

    if ( localStorage.getItem( 'data' ) ) {

      // JSON.parse -> convierte un string JSON a objeto
      this.listas = JSON.parse( localStorage.getItem( 'data' ) );

    } else {

      this.listas = [];

    }

  }
}
