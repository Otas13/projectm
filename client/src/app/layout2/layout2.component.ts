import { Component, OnInit } from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";
import {DialogL2Component} from "../dialog-l2/dialog-l2.component";

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})
export class Layout2Component extends LayoutComponent {
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    const currentTab = this.activeTab;
    this.activeTab = this.Tab.ADD_PAYMENT;
    const dialogRef = this.dialog.open(DialogL2Component, {
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
    const dialogRef = this.dialog.open(DialogL2Component, {
      width: '250px',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = currentTab;
    });
  }
}
