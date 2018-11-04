import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-layout4',
  templateUrl: './layout4.component.html',
  styleUrls: ['./layout4.component.scss']
})
export class Layout4Component implements OnInit {

  constructor(private route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }
  nextPage(){
    // todo: stopnout timer
    this._router.navigateByUrl(this.route.snapshot.data['nextPage']);
  }
}
