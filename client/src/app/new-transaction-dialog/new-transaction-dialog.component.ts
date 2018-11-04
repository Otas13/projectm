import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppComponent} from '../app.component';
import {TransactionService} from '../transaction.service';
import {Transaction} from '../transaction';

/**
 * komponenta dialogoveho okna
 */
@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss']
})
export class NewTransactionDialogComponent implements OnInit {
  subject = ''; // oboustranne provazano s hodnotou inputu predmetu
  amount = '';  // -||- castky
  sign = '-'; // defaultne castku strhne
  pickedDate = new Date();
  title;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * metoda volana po kliknuti na storno
   * pouze zavre dialog
   */
  onClickStorno(): void {
    this.dialogRef.close();
  }

  /**
   * metoda po ulozeni
   */
  onClickSave(): void {
    // prida novy objekt transakce do seznamu
    const amount = this.data.payment ? -Number(this.amount) : Number(this.amount);
    this.transactionService.push(new Transaction(amount, this.subject, this.pickedDate));
    this.dialogRef.close();
  }
  ngOnInit() {
    this.sign = this.data.payment ? '-' : '+';
    this.title = this.data.title ? this.data.title : '';
  }
}
