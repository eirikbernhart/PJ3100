import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../../pages/sparing-object/sparing-object';
import { Sparing } from '../sparing/sparing';


@Component({
  selector: 'sparing-detail-component',
  templateUrl: 'sparing-object-detail-component.html'
})
export class SparingObjectDetailComponent {

  public prisToSet;

  constructor(
    public navCtrl: NavController, 
    public sparing: Sparing
    ) {
      console.log("Sparing-object-component constructor ran!");
    }

    

  @Input()
  sparingObject: SparingObject;
  
  



}
