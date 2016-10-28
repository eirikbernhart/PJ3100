import { Component } from '@angular/core';
import { Forside } from '../forside/forside';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {

  tab1Root: any = Forside;
  constructor() {
  }

}
