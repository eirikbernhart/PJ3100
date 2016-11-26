import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { SparingService } from '../../app/sparing-service';
import { NySparing } from '../ny-sparing/ny-sparing';

@Component({
  selector: 'page-sparing',
  templateUrl: 'sparing.html'
})


export class Sparing implements OnInit {

  nySparing = NySparing;

  sparingObjects: SparingObject[];
  selectedSparingObject: SparingObject;
	
 



  constructor(public navcontroller: NavController, private sparingService: SparingService) {
	  
	  
	  

  }
	
  getSparingObjects(): void {
	  
	  this.sparingService.getSparingObjects().then(sparingObjects => this.sparingObjects = sparingObjects);
  }
	
  ngOnInit(): void {
	  this.getSparingObjects();
  }
	
  onSelect(sparingObject: SparingObject): void {
	  this.selectedSparingObject = sparingObject;
  }
	

  deSelect (sparingObject: SparingObject): void {
	  this.selectedSparingObject = null;
  }
	
  defaultValue(sparingObject: SparingObject): void {
	  
	  this.selectedSparingObject = {id: 0, name: "Ingen sparing registrert!",
					pris: 0, dato: "ingen"};
	  
  }
	
  
  deleteSparing(selectedSparingObject) {
	  
	  console.log("Length before delete: " + this.sparingObjects.length)
	  
	  let index = this.sparingObjects.indexOf(selectedSparingObject);
	  if(index > -1) {
		  this.sparingObjects.splice(index, 1);
		  this.deSelect(selectedSparingObject);
		  if(this.sparingObjects.length <= 0) {
			  this.defaultValue(selectedSparingObject);
		  }
	  }
	  console.log("Length after delete: " + this.sparingObjects.length)
	  
	 
	  
  }
	
  endreSparingPris(selectedSparingObject) {
	  
	  this.selectedSparingObject.pris = 0;
	
  }
	

}


