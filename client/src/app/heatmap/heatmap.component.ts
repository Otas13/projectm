import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import * as HeatMapJS from "heatmapjs";

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  @Input() hidden: boolean;
  @Input() active: boolean;
  @Input() heatmapData: any;
  @Output('heatmapData') heatmapChange: EventEmitter<any> = new EventEmitter<any>();
  private _heatmap: any;

  constructor() {
  }

  ngOnInit() {
    this._heatmap = HeatMapJS.create({
      container: document.getElementById("heatmap-view"),
      maxOpacity: .6,
      radius: 15,
      blur: .90,
      backgroundColor: 'rgba(0, 0, 58, 0.96)'
    });
    if(this.heatmapData){
      this._heatmap.setData(this.heatmapData);
    }
    this.heatmapChange.emit(this._heatmap.getData());
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(ev: MouseEvent) {
    if (this.active) {
      ev.preventDefault();
      const x = ev.clientX;
      const y = ev.clientY;
      this._heatmap.addData({x: x, y: y, value: 1});
      this.heatmapChange.emit(this._heatmap.getData());
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchmove(ev: TouchEvent) {
    ev.preventDefault();
    if (this.active) {
      ev.preventDefault();
      const x = ev.touches[0].pageX;
      const y = ev.touches[0].pageY;
      this._heatmap.addData({x: x, y: y, value: 1});
      this.heatmapChange.emit(this._heatmap.getData());
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(ev: MouseEvent) {
    ev.preventDefault();
    if (this.active) {
      const x = ev.clientX;
      const y = ev.clientY;
      this._heatmap.addData({ x: x, y: y, value: 1 });
      this.heatmapChange.emit(this._heatmap.getData());
    }
  }
}
