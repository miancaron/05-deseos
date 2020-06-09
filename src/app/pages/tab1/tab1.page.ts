import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService: DeseosService ,
               private router: Router,
               private alertCtrl: AlertController) {

  }

  // async convierte el método a una promesa
  async agregarLista() {

      const alert = await this.alertCtrl.create({
        header: 'Nueva lista',
        inputs: [
          {
            name: 'titulo',
            type: 'text',
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
            text: 'Crear',
            handler: ( data ) => {
              // data son los datos del formulario
              console.log( data );
              // si no se ha escrito nada
              if ( data.titulo.length === 0 ){
                //no hacemos nada
                return;
              }

              // Crear la lista
              const listaId = this.deseosService.crearLista( data.titulo );

              // Navegar a la lista
              this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaId }`);

            }
          }
        ]
      });
  
      alert.present();

  }

}
