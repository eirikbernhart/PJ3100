import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { SparingService } from '../../app/sparing-service';
import { NySparing } from '../ny-sparing/ny-sparing';

@Component({
  selector: 'page-sparing',
  templateUrl: 'sparing.html'
})
<<<<<<< HEAD

export class Sparing implements OnInit {

  nySparing = NySparing;

  sparingObjects: SparingObject[];
  selectedSparingObject: SparingObject;
	
 


=======
export class Sparing implements OnInit {
  nySparing = NySparing;

  sparingObjects: SparingObject[];
  selectedSparingObject: SparingObject;
	
 

>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  constructor(public navcontroller: NavController, private sparingService: SparingService) {
	  
	  
	  
<<<<<<< HEAD
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
	
=======
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
	
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
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
	
<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
}


