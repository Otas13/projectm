import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; // moment ma divnej modul

@Pipe({
  name: 'datum'
})
export class DatumPipe implements PipeTransform {

  /**
   * pipe dostane jako parametr text k formatovani a vrati co ma definovano
   * pouziti {{'text, nebo promenna' | nazevPipy}}
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: any, args?: any): any {
    return moment(value).format('D.MM');
  }

}
