import {Component, OnInit} from '@angular/core';
import {TransactionService} from './transaction.service';
import {Transaction} from './transaction';
import {MatDialog} from '@angular/material';
import {NewTransactionDialogComponent} from './new-transaction-dialog/new-transaction-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _startAmount = 0;
  transactionList: Transaction[];

  /**
   * constructor komponenty
   * parametry jsou dodany angularem, netreba se starat o jejich predani
   * @param {TransactionService} transactionService
   * @param {MatDialog} dialog
   */
  constructor(private transactionService: TransactionService, private dialog: MatDialog) {}
  /**
   * otevreni dialogu
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
    });
  }

  /**
   * metoda volana potom co je komponenta pripravena
   * kontext this je dostupny az zde, ne v constructoru
   */
  ngOnInit(): void {
    this.transactionService.transactionList.subscribe((updatedList: Transaction[]) => {
      this.transactionList = updatedList;
    });
  }
  get startAmount(): number {
    return this._startAmount;
  }
  set startAmount(value: number) {
    this._startAmount = value;
  }
  get availableAmount(): number {
    return this.startAmount - this.transactionService.total;
  }
}
