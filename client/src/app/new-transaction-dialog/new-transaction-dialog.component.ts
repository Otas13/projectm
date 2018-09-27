import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
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
  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    private transactionService: TransactionService) {}

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
    this.transactionService.push(new Transaction(Number(this.amount), this.subject, new Date()));
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}
