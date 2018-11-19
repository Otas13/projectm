import {Component, HostListener} from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";
import {NewTransactionDialogComponent} from "../new-transaction-dialog/new-transaction-dialog.component";

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss'],
})
export class Layout1Component extends LayoutComponent {
  showMenu = true;
  
  showLastTransactions() {
	  super.showLastTransactions();
	  this.showMenu = !this.showMenu;
  }
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    this.showMenu = !this.showMenu;
	const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: true, title: 'Zadat platbu'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenu = !this.showMenu;
    });
  }

  /**
   * otevreni dialogu pro zvyseni prostredku
   */
  openAddResourcesDialog(ev: MouseEvent): void {
	this.showMenu = !this.showMenu;
    this.saveButtonClick('openAddResourcesDialog');
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenu = !this.showMenu;
    });
  }
	
  showCompleteHistory(){
	  super.showCompleteHistory();
	  this.showMenu = !this.showMenu;
  }
  showMetro(){
	  this.showMenu = !this.showMenu;
  }
}
