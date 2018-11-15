import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import QRCode from 'qrcode';
import {DataKey, DataService} from "../data.service";
import {LayoutComponent} from "../layout/layout.component";
import * as moment from  "moment";

@Component({
  selector: 'app-layout4',
  templateUrl: './layout4.component.html',
  styleUrls: ['./layout4.component.scss']
})
export class Layout4Component extends LayoutComponent {
  showQRCode;
  QRReady = new EventEmitter<boolean>();
  QRDataUrl;
  showSidebar = false;

  async ngOnInit() {
    super.ngOnInit();
    this.QRReady.emit(false);
    this.showQRCode = (window.innerWidth > 720) && !this.dataService.isAdmin;
    this.generateQRCode();
    console.log(this.dataService.username);
  }

  toggleSidebar(show: boolean) {
    this.showSidebar = show;
  }

  openSidenav(){
    this.saveButtonClick('openSidenav');
  }

  async generateQRCode(){
    try {
      this.QRDataUrl = await QRCode.toDataURL(`https://${this.window.location.hostname}?username=${this.dataService.username}&layout=l4s1`);
      this.QRReady.emit(true);
    } catch (err) {
      this.QRReady.emit(true);
      console.error(err);
    }
  }

  nextPage() {
    if(!this.dataService.isAdmin && (window.innerWidth < 720)) {
      const spentTime = moment.duration(moment().diff(this.timer)).asMinutes();
      this.setDataKey(DataKey.SPENT_MINUTES, spentTime);
      this.setDataKey(DataKey.HEATMAP, this.heatmapData);
      this._router.navigateByUrl(this.route.snapshot.data['nextPage']);
      this.setDataKey(DataKey.HEATMAP, this.heatmapData);
      this.dataService.flushData();
    }
  }
}
