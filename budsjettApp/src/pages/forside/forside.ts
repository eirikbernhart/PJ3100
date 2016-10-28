import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import 'chart.js/src/chart.js';
declare var Chart;
/*
  Generated class for the Forside page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forside',
  templateUrl: 'forside.html',
})

export class Forside {
  diagram: string = "dag";
  @ViewChild('canvas') canvas:ElementRef;

  ionViewDidEnter(){
    let ctx = this.canvas.nativeElement
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [1200, 1900, 800, 500], //Kategori data skal inn i dette arrayet!
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          options: {
            onClick: false,
            legend: {
              display: false
            }
          }
        }]
      },
    });
    
  } 
}