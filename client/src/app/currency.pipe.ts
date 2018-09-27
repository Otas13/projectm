import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  /**
   * pipe dostane jako parametr text k formatovani a vrati co ma definovano
   * pouziti {{'text, nebo promenna' | nazevPipy}}
   * @param value
   * @param args
   * @returns {any}
   */
  transform(value: any, args?: any): any {
    return `${value} Kč`;
  }

}
