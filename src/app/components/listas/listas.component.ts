import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

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

   // async convierte el método a una promesa
   async modificarTituloLista( lista: Lista ) {

    const alert = await this.alertCtrl.create({
      header: 'Escriba nuevo título',
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
          }
        },
        {
          text: 'Modificar',
          handler: ( data ) => {
            // data son los datos del formulario
            console.log( data );
            // si no se cambia el título
            if ( data.titulo === lista.titulo ){
              // no hacemos nada
              return;
            }

            // Modificar el título de la lista
            this.deseosService.modificarTituloLista( lista, data.titulo );

            // Navegar a la pantalla que corresponada
            // if ( this.terminada ) {
            //   this.router.navigateByUrl('/tabs/tab2');
            // } else {
            //   this.router.navigateByUrl('/tabs/tab1');
            // }
          }
        }
      ]
    });

    alert.present();
}

}
