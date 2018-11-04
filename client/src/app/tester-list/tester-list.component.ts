import {Component, OnInit, ViewChild} from '@angular/core';
import {Transaction} from "../transaction";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {Route} from "../routes.enum";

@Component({
  selector: 'app-tester-list',
  templateUrl: './tester-list.component.html',
  styleUrls: ['./tester-list.component.scss']
})
export class TesterListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Transaction>();
  isLoading = true;
  displayedColumns: string[] = ['username', 'createdAt'];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(!this.dataService.isLoggedIn) {
      this.router.navigateByUrl(Route.LOGIN);
    }
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataService.listTesters()
      .then(list => {
        this.isLoading = false;
        this.dataSource.data = list;
      })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showTestResults(id){
    this.isLoading = true;
    this.dataService.getTestResult(id)
      .then(ok => {
        this.isLoading = false;
        this.router.navigateByUrl(Route.SCENARIO_LIST);
      });
  }
}
