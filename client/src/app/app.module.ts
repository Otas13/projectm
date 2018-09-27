import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NewTransactionDialogComponent } from './new-transaction-dialog/new-transaction-dialog.component';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CurrencyPipe } from './currency.pipe';
import { DatumPipe } from './datum.pipe';

/**
 * Veskere pouzite komponenty je treba zde registrovat
 * vetsinu obstarava angularovy cli
 */
@NgModule({
  declarations: [
    AppComponent,
    NewTransactionDialogComponent,
    CurrencyPipe,
    DatumPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewTransactionDialogComponent]
})
export class AppModule { }
