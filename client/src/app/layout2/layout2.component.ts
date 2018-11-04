import { Component, OnInit } from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";
import {DialogL2Component} from "../dialog-l2/dialog-l2.component";

@Component({
  selector: 'app-layout2',
  templateUrl: './layout2.component.html',
  styleUrls: ['./layout2.component.scss']
})
export class Layout2Component extends LayoutComponent {
  Tab = {
    LAST_TRANSACTIONS: 'last',
    ALL_TRANSACTIONS: 'all'
  };
  activeTab;
  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    const dialogRef = this.dialog.open(DialogL2Component, {
      width: '250px',
      data: {payment: true, title: 'Zadat platbu'}
    });
  }

  /**
   * otevreni dialogu pro zvyseni prostredku
   */
  openAddResourcesDialog(ev: MouseEvent): void {
    this.saveButtonClick('openAddResourcesDialog');
    const dialogRef = this.dialog.open(DialogL2Component, {
      width: '250px',
      data: {payment: false, title: 'Navýšit zůstatek'}
    });
  }

  showLastTransactions() {
    this.saveButtonClick('showLastTransactions');
    this.displayedColumns = ['date', 'subject', 'amount'];
    this.activeTab = this.Tab.LAST_TRANSACTIONS;
    this.dataSource.data = this.transactionList.slice(0, 5);
  }
  showCompleteHistory() {
    this.saveButtonClick('showCompleteHistory');
    this.displayedColumns = ['select', 'date', 'subject', 'amount'];
    this.activeTab = this.Tab.ALL_TRANSACTIONS;
    this.dataSource.data = this.transactionList;
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.activeTab = this.Tab.ALL_TRANSACTIONS;
  }
}
