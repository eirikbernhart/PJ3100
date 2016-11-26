import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../../pages/sparing-object/sparing-object';

@Component({
  selector: 'sparing-detail-component',
  templateUrl: 'sparing-object-detail-component.html'
})
export class SparingObjectDetailComponent {

  constructor(public navCtrl: NavController) {}

  @Input()
  sparingObject: SparingObject;



}
