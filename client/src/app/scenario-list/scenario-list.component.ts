import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {DataKey, DataService, Layout} from "../data.service";
import {Router} from "@angular/router";
import {Route} from "../routes.enum";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {
  isMobileDevice;
  isL1Done;
  isL2Done;
  isL3Done;
  isL4Done;
  isL5Done;
  constructor(private _router: Router, private dataService: DataService, protected deviceService: DeviceDetectorService) {
    this.isL1Done = dataService.isLayoutDone(Layout.ONE);
    this.isL2Done = dataService.isLayoutDone(Layout.TWO);
    this.isL3Done = dataService.isLayoutDone(Layout.THREE);
    this.isL4Done = dataService.isLayoutDone(Layout.FOUR);
    this.isL5Done = dataService.isLayoutDone(Layout.FIVE);
  }

  ngOnInit() {
    if (!this.dataService.isLoggedIn) {
      this._router.navigateByUrl(Route.LOGIN);
    }
    this.isMobileDevice = this.deviceService.isMobile() || this.deviceService.isTablet();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    switch(ev.key){
      case 't':
        this._router.navigateByUrl('tester-list');
        break;
      default:
        break;
    }
  }
}
