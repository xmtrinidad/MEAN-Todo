import { Injectable } from '@angular/core';

@Injectable()
export class NavService {
  private sideMenuStatus = false;

  constructor() { }

  setSideMenuStatus() {
    this.sideMenuStatus = this.sideMenuStatus !== true;
  }

  getSideMenuStatus() {
    return this.sideMenuStatus;
  }

}
