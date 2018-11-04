import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-layout3',
  templateUrl: './layout3.component.html',
  styleUrls: ['./layout3.component.scss']
})
export class Layout3Component implements OnInit {

  constructor(private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }
  nextPage(){
    // todo: stopnout timer
    this._router.navigateByUrl(this.route.snapshot.data['nextPage']);
  }
}
