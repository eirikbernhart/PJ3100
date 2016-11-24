
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { SparingService } from '../../app/sparing-service';

@Component({
  selector: 'page-ny-sparing',
  templateUrl: 'ny-sparing.html'
})

export class NySparing implements OnInit{

  sparingObjects: SparingObject[];
  extName: string;
  extPris: number;
	
  constructor(public navCtrl: NavController, private sparingService: SparingService) {}
	
	
  getSparingObjects(): void {
	  
	  this.sparingService.getSparingObjects().then(sparingObjects => this.sparingObjects = sparingObjects);
  }
	
	
  ngOnInit(): void {
	  this.getSparingObjects();
  }

  nySparing(id: number, name: string, pris: number){
    
	console.log("StaticAssert that length is 2: " + this.sparingObjects.length);
	  
	this.sparingObjects.push({id: this.sparingObjects.length + 1, name: this.extName, pris: this.extPris, dato: '21.12.2012'});
	

  }

}
