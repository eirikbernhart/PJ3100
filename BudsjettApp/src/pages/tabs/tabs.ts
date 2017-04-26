import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { Forside } from '../forside/forside';
import { Sparing } from '../sparing/sparing';
import { TidsLinje } from '../tidslinje/tidslinje-page';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = Forside;
  tab3Root: any = Sparing;
  tab4Root: any = TidsLinje;

  constructor() {

  }
}
