import {Component, HostListener} from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";
import {NewTransactionDialogComponent} from "../new-transaction-dialog/new-transaction-dialog.component";

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss'],
})
export class Layout1Component extends LayoutComponent {
  showMenuIcons = true;
  
  Tab = {
    LAST_TRANSACTIONS: 'last',
    ALL_TRANSACTIONS: 'all',
    ADD_PAYMENT: 'addTransaction',
    ADD_RESOURCES: 'addResource',
    MENU: 'menu'
  };
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    this.showMenuIcons = !this.showMenuIcons;
	const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: true, title: 'Zadat platbu'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenuIcons = !this.showMenuIcons;
    });
  }

  /**
   * otevreni dialogu pro zvyseni prostredku
   */
  openAddResourcesDialog(ev: MouseEvent): void {
	this.showMenuIcons = !this.showMenuIcons;
    this.saveButtonClick('openAddResourcesDialog');
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.showMenuIcons = !this.showMenuIcons;
    });
  }
  showMetro(){
	  this.activeTab = this.Tab.MENU;
  }
  ngOnInit(){
	  super.ngOnInit();
	  this.activeTab = this.Tab.MENU;
  }
}
