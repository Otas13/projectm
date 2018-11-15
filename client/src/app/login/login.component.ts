import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import { Router, ActivatedRoute } from '@angular/router';
import {Route} from "../routes.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = 'admin';
  constructor(protected route: ActivatedRoute, private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
    if (('username' in this.route.snapshot.queryParams) && ('layout' in this.route.snapshot.queryParams)){
      // url login
      this._dataService.username = this.route.snapshot.queryParams['username'];
      // requested layout
      this._router.navigateByUrl(this.route.snapshot.queryParams['layout']);
    }
  }

  login(){
    // TODO: osetreni
    this._dataService.username = this.username;
    this._router.navigateByUrl(Route.SCENARIO_LIST);
  }
}
