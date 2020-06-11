import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  // Con pure=false el pipe actuará siempre que haya un cambio.
  // Con pure=true (valor por defecto) el pipe actuará solo cuando el cambio se produzca
  // en el componente en el que estamos usando el pipe.
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {

    return listas.filter( lista => lista.terminada === completada );

  }

}
