import {Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {NewTransactionDialogComponent} from "../new-transaction-dialog/new-transaction-dialog.component";
import {DataKey, DataService, Layout} from "../data.service";
import {Transaction} from "../transaction";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../transaction.service";
import * as moment from "moment";
import {Chart} from 'chart.js';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _startAmount = 0;
  transactionList: Transaction[];
  dataSource = new MatTableDataSource<Transaction>(this.transactionList);
  displayedColumns: string[] = ['select', 'date', 'subject', 'amount'];
  selection = new SelectionModel<Transaction>(true, []);
  hideMap = true;
  isMapActive = true;
  heatmapData;
  layout;
  scenario;
  timer;
  activeTab;
  chart;
  Tab = {
    LAST_TRANSACTIONS: 'last',
    ALL_TRANSACTIONS: 'all',
    ADD_PAYMENT: 'addTransaction',
    ADD_RESOURCES: 'addResource'
  };

  /**
   *
   * @param {TransactionService} transactionService
   * @param {MatDialog} dialog
   * @param {ActivatedRoute} route
   * @param {Router} _router
   * @param {DataService} dataService
   * @param {Window} window
   */
  constructor(protected transactionService: TransactionService, protected dialog: MatDialog, protected route: ActivatedRoute, protected _router: Router, protected dataService: DataService, @Inject(Window) protected window: Window) {
    this.dataSource = new MatTableDataSource<Transaction>();
  }

  /**
   * otevreni dialogu pro zadani platby
   */
  openPaymentDialog(ev: MouseEvent): void {
    this.saveButtonClick('openPaymentDialog');
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: true}
    });
  }

  /**
   * otevreni dialogu pro zvyseni prostredku
   */
  openAddResourcesDialog(ev: MouseEvent): void {
    this.saveButtonClick('openAddResourcesDialog');
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      width: '250px',
      data: {payment: false}
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  remove(ev: MouseEvent) {
    this.saveButtonClick('remove');
    this.selection.selected.map((transaction: Transaction) => {
      this.transactionService.delete(transaction.id);
    });
    this.selection.clear();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(ev: MouseEvent) {
    this.saveButtonClick('masterToggle');
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * metoda volana potom co je komponenta pripravena
   * kontext this je dostupny az zde, ne v constructoru
   */
  ngOnInit(): void {
    if (!this.dataService.isLoggedIn) {
      this._router.navigateByUrl('/login');
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: "#3cba9f",
            fill: false
          },
        ],
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    this.activeTab = this.Tab.ALL_TRANSACTIONS;

    this.scenario = this.route.snapshot.data['scenario'];
    this.layout = this.route.snapshot.data['layout'];

    this.timer = moment();

    this.transactionService.transactionList.subscribe((updatedList: Transaction[]) => {
      this.transactionList = updatedList;
      this.dataSource.data = this.transactionList;
      const chartData = updatedList.filter(transaction => (transaction.amount < 0));
      this.chart.data.datasets[0].data = chartData.map(transaction => {
        return -1 * transaction.amount;
      }).reverse();
      this.chart.data.labels = chartData.map(transaction => {
        return moment(transaction.date).format('DD.MM');
      }).reverse();
      this.chart.update();
    });
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.isMapActive = !this.dataService.isAdmin;

    this.transactionService.reset();
    this.transactionService.push(new Transaction(17000, 'Výplata', moment().subtract(1, 'month').toDate()));
    this.transactionService.push(new Transaction(-9000, 'Nájemné', moment().subtract(23, 'day').toDate()));
    this.transactionService.push(new Transaction(-3000, 'Úspory', moment().subtract(20, 'day').toDate()));
    this.transactionService.push(new Transaction(-300, 'Kartička na MHD', moment().subtract(14, 'day').toDate()));
    this.transactionService.push(new Transaction(-1000, 'Velký nákup', moment().subtract(10, 'day').toDate()));

    //alert(`Úkol scénáře: ${this.route.snapshot.data['ScenarioInstructions']}`);
  }
  get startAmount(): number {
    return this._startAmount;
  }

  set startAmount(value: number) {
    this._startAmount = value;
  }

  get availableAmount(): number {
    return this.startAmount + this.transactionService.total;
  }

  getButtonClicks(buttonId) {
    buttonId = this.getButtonId(buttonId);
    if (this.dataService.isAdmin) {
      return buttonId in this.dataService.data[this.layout][this.scenario] ? Number(this.getDataByKey(buttonId)) : 0;
    } else {
      return "";
    }
  }

  getButtonId(buttonId) {
    return `clicks_${buttonId}`;
  }

  saveButtonClick(buttonId: any) {
    if(!this.dataService.isAdmin) {
      buttonId = this.getButtonId(buttonId);
      let clickCount = buttonId in this.dataService.data[this.layout][this.scenario] ? Number(this.getDataByKey(buttonId)) + 1 : 1;
      this.setDataKey(buttonId, clickCount);
    }
  }

  @HostListener('document:keyup', ['$event'])
  onMousemove(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'm':
        if (this.dataService.isAdmin) {
          this.heatmapData = this.getDataByKey(DataKey.HEATMAP);
        }
        this.hideMap = !this.hideMap;
        break;
      case 'f':
        this.setDataKey(DataKey.HEATMAP, this.heatmapData);
        this.dataService.flushData();
        break;
      case 't':
        if (this.dataService.isAdmin) {
          alert(`Strávený čas: ${this.getDataByKey(DataKey.SPENT_MINUTES)} min`);
        }
        break;
      default:
        break;
    }
  }

  setDataKey(key, data) {
    this.dataService.setKey(this.layout, this.scenario, key, data);
  }

  getDataByKey(key) {
    return this.dataService.data[this.layout][this.scenario][key];
  }

  nextPage() {
    if (!this.dataService.isAdmin) {

    }
    const spentTime = moment.duration(moment().diff(this.timer)).asMinutes();
    this.setDataKey(DataKey.SPENT_MINUTES, spentTime);
    this.setDataKey(DataKey.HEATMAP, this.heatmapData);
    this._router.navigateByUrl(this.route.snapshot.data['nextPage']);
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
}
