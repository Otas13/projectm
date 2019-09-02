import { Injectable } from '@angular/core';
import * as moment from "moment";
import _date = moment.unitOfTime._date;
export enum Scenario {
  ONE = 'scenarioOne', TWO = 'scenarioTwo', THREE = 'scenarioThree', FOUR = 'scenarioFour'
}
export enum Layout {
  ONE = 'layoutOne', TWO = 'layoutTwo', THREE = 'layoutThree', FOUR = 'layoutFour', FIVE = 'layoutFive'
}
export enum DataKey {
  HEATMAP = 'heatmap',
  SPENT_MINUTES = 'spentMinutes',
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  get data() {
    return this._data;
  }
  set username(value: string) {
    this._data.username = value;
  }
  get username(): string {
    return this._data.username;
  }
  get isAdmin(): boolean {
    return this.data.username === 'admin';
    //return true;
  }
  get isLoggedIn(): boolean {
    return this.data.username.length > 0;
  }
  private _data = {
    username: '',
    layoutOne: {scenarioOne: {}, scenarioTwo: {}, scenarioThree: {}, scenarioFour: {}},
    layoutTwo: {scenarioOne: {}, scenarioTwo: {}, scenarioThree: {}, scenarioFour: {}},
    layoutThree: {scenarioOne: {}, scenarioTwo: {}, scenarioThree: {}, scenarioFour: {}},
    layoutFour: {scenarioOne: {}, scenarioTwo: {}, scenarioThree: {}, scenarioFour: {}},
    layoutFive: {scenarioOne: {}, scenarioTwo: {}, scenarioThree: {}, scenarioFour: {}},
  };
  constructor() {}
  setKey(layout: Layout, scenario: Scenario, key: DataKey, value){
    this._data[layout][scenario][key] = value;
  }
  isLayoutDone(layout) {
    return Object.keys(this._data[layout][Scenario.ONE]).length !== 0
    && Object.keys(this._data[layout][Scenario.TWO]).length !== 0
    && Object.keys(this._data[layout][Scenario.THREE]).length !== 0
    && Object.keys(this._data[layout][Scenario.FOUR]).length !== 0
  }
  flushData(){
    fetch('/api/put', {
      method: 'PUT',
      body: JSON.stringify(this.data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer FtxJ3bYw6VBd97H5SvTo'
      },
    })
      .then(response => {
       console.log(response);
      })
  }
  listTesters(): Promise<any> {
    return fetch('/api/list')
      .then(res => res.json())
      .then(json => {
        return json
      });
  }
  getTestResult(id): Promise<any> {
    return fetch(`/api/get/${id}`)
      .then(res => res.json())
      .then(json => {
        json.username = this._data.username;
        this._data = json;
        return true
      });
  }
}
