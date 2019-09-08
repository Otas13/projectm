import {Component, EventEmitter} from '@angular/core';
import QRCode from 'qrcode';
import {DataKey} from "../data.service";
import {LayoutComponent} from "../layout/layout.component";
import * as moment from "moment";
import {Route} from "../routes.enum";

@Component({
  selector: 'app-layout4',
  templateUrl: './layout4.component.html',
  styleUrls: ['./layout4.component.scss']
})
export class Layout4Component extends LayoutComponent {
  QRReady = new EventEmitter<boolean>();
  QRDataUrl;
  showSidebar = false;

  async ngOnInit() {
    super.ngOnInit();
    this.QRReady.emit(false);
    this.generateQRCode(Route.L4S1);
    this.isMobileLayout = true;
  }

  toggleSidebar(show: boolean) {
    this.showSidebar = show;
  }

  openSidenav() {
    this.saveButtonClick('openSidenav');
  }

  async generateQRCode(route) {
    try {
      this.QRDataUrl = await QRCode.toDataURL(`https://${this.window.location.hostname}?username=${this.dataService.username}&layout=${route}`);
      this.QRReady.emit(true);
    } catch (err) {
      this.QRReady.emit(true);
      console.error(err);
    }
  }

  nextPage() {
    const spentTime = moment.duration(moment().diff(this.timer)).asMinutes();
    this.setDataKey(DataKey.SPENT_MINUTES, spentTime);
    this.setDataKey(DataKey.HEATMAP, this.heatmapData);
    this._router.navigateByUrl(this.route.snapshot.data['nextPage']);
    this.setDataKey(DataKey.HEATMAP, this.heatmapData);
    if (!this.dataService.isAdmin) {
      this.dataService.flushData();
    }
  }
}
