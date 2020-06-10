import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string = '';

  constructor( private deseosService: DeseosService,
               private route: ActivatedRoute ) {

    // Recuperar el valor del parámetro de la url
    const listaId = this.route.snapshot.paramMap.get('listaId');

    this.lista = this.deseosService.obtenerLista( listaId );

   }

  ngOnInit() {
  }

  agregarItem() {

    if (this.nombreItem.length === 0) {
      return;
    }

    const nuevoItem = new ListaItem( this.nombreItem );

    // Insertar nuevo item en la lista
    this.lista.items.push( nuevoItem );

    // Ponemos el valor a vacío porque es lo que se está mostrando en la pantalla
    this.nombreItem = '';

    // Guardar en el localStorage
    this.deseosService.guardarStorage();

    // Explicación: this.deseosService.guardarStorage() guarda en el localStorage la lista propia
    // de deseosServices, pero en este método lo que hemos actualizado es la lista propia de esta clase.
    // El truco está en que en en el constructor de esta clase hacemos:
    //   this.lista = this.deseosService.obtenerLista( listaId );
    // y, como en javascript todos los objetos se pasan por referencia, resulta que la lista de
    // esta clase es la misma que la de deseosService.

  }

  cambioCheck( item: ListaItem ){

    // El método filter devuelve todos los elementos que cumplen una condición
    const pendientes = this.lista.items
                              .filter( itemData => !itemData.completado )
                              .length;
    
    if ( pendientes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    } else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this.deseosService.guardarStorage();

    console.log(this.deseosService.listas);

  }

  borrar( i: number ){

    // Borrar un elemento desde la posición i
    this.lista.items.splice( i, 1 );

    this.deseosService.guardarStorage();

  }

}
