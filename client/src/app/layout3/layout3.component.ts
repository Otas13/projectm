import {Component} from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";
import {DialogL3Component} from "../dialog-l3/dialog-l3.component";

@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styleUrls: ['./layout3.component.scss']
})
export class Layout3Component extends LayoutComponent {
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    const currentTab = this.activeTab;
    this.activeTab = this.Tab.ADD_PAYMENT;
    const dialogRef = this.dialog.open(DialogL3Component, {
      width: '250px',
      data: {payment: true, title: 'Zadat platbu'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = currentTab;
    });
  }

  /**
   * otevreni dialogu pro zvyseni prostredku
   */
  openAddResourcesDialog(ev: MouseEvent): void {
    this.saveButtonClick('openAddResourcesDialog');
    const currentTab = this.activeTab;
    this.activeTab = this.Tab.ADD_RESOURCES;
    const dialogRef = this.dialog.open(DialogL3Component, {
      width: '250px',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = currentTab;
    });
  }
}
