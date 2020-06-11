import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  // ViewChild sirve para hacer referencia en este archivo a los elementos del archivo html.
  // Al poner entre paréntesis el identificador concreto de la etiqueta, lista solo será ese IonList.
  @ViewChild( 'ionListDelHtml' ) lista: IonList;
  @Input() terminada = true;

  constructor( public deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {

     }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    // Navegar a la lista
    if ( this.terminada ){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

  }

  borrarLista( lista: Lista ){

    // Borrar un elemento de la lista
    this.deseosService.borrarLista( lista );

  }

  async editarLista( lista: Lista ){

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          // role es el tipo de botón: 'cancel' indica que es botón de cancelar y eso implica,
          // por ejemplo, que cuando se pincha fuera de la alerta también se lanza el handler
          // de este botón.
          role: 'cancel',
          // handler: lo que hace cuando se pulsa el botón
          handler: () => {
            console.log('Cancelar');
            // Cerrar el botón de "editar"
            this.lista.closeSlidingItems();
          }
        },
        {
          text: 'Actualizar',
          handler: ( data ) => {
            // data son los datos del formulario
            console.log( data );
            // si no se ha escrito nada
            if ( data.titulo.length === 0 ){
              // no hacemos nada
              return;
            }

            lista.titulo = data.titulo;

            this.deseosService.guardarStorage();

            // Cerrar el botón de "editar"
            this.lista.closeSlidingItems();

          }
        }
      ]
    });

    alert.present();

  }

}
