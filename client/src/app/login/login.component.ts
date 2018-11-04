import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {Route} from "../routes.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = "admin";

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit() {
  }

  login(){
    // TODO: osetreni
    this._dataService.username = this.username;
    this._router.navigateByUrl(Route.SCENARIO_LIST);
  }
}
