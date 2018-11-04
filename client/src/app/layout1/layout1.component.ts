import {Component, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Transaction} from "../transaction";
import {TransactionService} from "../transaction.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {NewTransactionDialogComponent} from "../new-transaction-dialog/new-transaction-dialog.component";
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute, Router} from "@angular/router";
import {DataKey, DataService, Layout} from "../data.service";
import {LayoutComponent} from "../layout/layout.component";

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss'],
})
export class Layout1Component extends LayoutComponent implements OnInit {

}
