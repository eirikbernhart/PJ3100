import { Component } from '@angular/core';
import { Forside } from '../forside/forside';
import { Sparing } from '../sparing/sparing';
import { TidsLinje } from '../tidslinje/tidslinje-page';
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
  tab2Root: any = Sparing;
  tab3Root: any = TidsLinje;
  constructor() {
  }

}
