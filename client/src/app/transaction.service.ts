import { Injectable } from '@angular/core';
import {Transaction} from './transaction';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // id counter
  private counter = 0;
  // pomocna promenna pouzita pro inicializaci objektu
  private _transactionListSource: Transaction[] = [];
  // vytvoreni objektu ktery dokaze notifikovat pri zmene vnitrniho stavu
  private _transactionListBS: BehaviorSubject<Transaction[]> = new BehaviorSubject(this._transactionListSource);
  // ziskani observable objektu, na ktery lze pripojit funkci volanou pri kazde zmene
  private _transactionList: Observable<Transaction[]> = this._transactionListBS.asObservable();
  constructor() {  }
  get transactionList(): Observable<Transaction[]> {
    return this._transactionList;
  }

  /**
   * fiktivni property vracejici sumu vsech transakci
   * @returns {number}
   */
  get total(): number {
    let count = 0;
    for (let i = 0; i < this._transactionListSource.length; i++) {
      count += this._transactionListSource[i].amount;
    }
    return count;
  }

  /**
   * pridani nove transakce
   * @param {Transaction} transaction
   */
  push(transaction: Transaction) {
    transaction.id = this.counter++;
    // unshift pridava prvky na zacatek pole https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
    this._transactionListSource.unshift(transaction);
    // next() zmeni vnitrni stav objektu a ten skrze observable hodnotu zavola funkci na ni subscribnutou s parametrem aktualniho seznamu
    this._transactionListBS.next(this._transactionListSource);
  }
  delete(id: number) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    this._transactionListSource = this._transactionListSource.filter((transaction: Transaction, index: Number) => {
      return transaction.id !== id;
    });
    this._transactionListBS.next(this._transactionListSource);
  }
  update(transaction: Transaction) {
    if (!('id' in transaction)) {
      throw new Error('Objekt neobsahuje ID');
    }
    for (let i = 0; i < this._transactionListSource.length; i++) {
      if (this._transactionListSource[i].id === transaction.id) {
        this._transactionListSource[i] = transaction;
      }
    }
  }
}
