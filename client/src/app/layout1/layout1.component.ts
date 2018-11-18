import {Component, HostListener} from '@angular/core';
import {LayoutComponent} from "../layout/layout.component";

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss'],
})
export class Layout1Component extends LayoutComponent {
  show = true;
  foo() {
    this.show = !this.show;
  }
}
