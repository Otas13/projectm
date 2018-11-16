import { Component, OnInit } from '@angular/core';
import {Layout4Component} from "../layout4/layout4.component";
import {DialogL5Component} from "../dialog-l5/dialog-l5.component";
import {Route} from "../routes.enum";

@Component({
  selector: 'app-layout5',
  templateUrl: './layout5.component.html',
  styleUrls: ['./layout5.component.scss']
})
export class Layout5Component extends Layout4Component {
  Tab = {
    LAST_TRANSACTIONS: 'last',
    ALL_TRANSACTIONS: 'all',
    ADD_PAYMENT: 'addTransaction',
    ADD_RESOURCES: 'addResource',
    MENU: 'menu'
  };
  showMenu(){
    this.activeTab = this.Tab.MENU;
  }
  async ngOnInit() {
    super.ngOnInit();
    this.QRReady.emit(false);
    this.showQRCode = (window.innerWidth > 720) && !this.dataService.isAdmin;
    this.generateQRCode(Route.L5S1);
  }
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    const currentTab = this.activeTab;
    this.activeTab = this.Tab.ADD_PAYMENT;
    const dialogRef = this.dialog.open(DialogL5Component, {
      width: '250px',
      panelClass: 'dark-container',
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
    const dialogRef = this.dialog.open(DialogL5Component, {
      width: '250px',
      panelClass: 'dark-container',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = currentTab;
    });
  }
}
