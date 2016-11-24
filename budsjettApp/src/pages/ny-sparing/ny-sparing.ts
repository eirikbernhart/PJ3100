<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SparingObject } from '../sparing-object/sparing-object';
import { SparingService } from '../../app/sparing-service';
<<<<<<< HEAD
=======
//import { Sparing } from '../pages/sparing/sparing';
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8

@Component({
  selector: 'page-ny-sparing',
  templateUrl: 'ny-sparing.html'
})
<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
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
	
<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  }

}
