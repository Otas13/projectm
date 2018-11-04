import {Component, HostListener, OnInit} from '@angular/core';
import {DataKey, DataService} from "../data.service";
import {Router} from "@angular/router";
import {Route} from "../routes.enum";

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {

  constructor(private _router: Router, private dataService: DataService) { }

  ngOnInit() {
    if(!this.dataService.isLoggedIn) {
      this._router.navigateByUrl(Route.LOGIN);
    }
  }

  @HostListener('document:keyup', ['$event'])
  onMousemove(ev: KeyboardEvent) {
    switch(ev.key){
      case 't':
        this._router.navigateByUrl('tester-list');
        break;
      default:
        break;
    }
  }
}
