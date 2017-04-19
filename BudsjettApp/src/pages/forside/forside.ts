import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { Instillinger } from '../instillinger/instillinger';
import { LoginPage } from '../login/login';


import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import 'moment-timezone';


import { CalculationService } from '../../providers/calculation-service';

import 'chart.js/src/chart.js';
declare var Chart;


@Component({
  selector: 'page-forside',
  templateUrl: 'forside.html',
})

export class Forside {

  

  
  public dateVarUpd = moment().tz("Europe/Berlin").format('MM/DD/YYYY');

  @ViewChild('canvas') doughCanvas;
  public doughChart: any;
 

  public instillinger = Instillinger;

  public expensesToShow: any;

  public sumTotalDay;
  public sumTotalWeek;
  public sumTotalMonth;

  filtrerTest: string = "month";

  public currentBalance: any = 16600;
  public foodTotalTest = 0;
  foodTotal;
  clothTotal;
  annetTotal;
  rent;

  public forkJoinedVal;



  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    public app: App,
    public calcServ: CalculationService,
  ) {

    console.log("Forside constructor ran!");

    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        app.getRootNav().setRoot(LoginPage);

      }
    });
  }


  logout() {
    this.authService.doLogout();
  }

  ionViewDidEnter() {

    this.calcServ.sumTotalAll(this.dateVarUpd, "month");
    Chart.defaults.global.legend.display = false;


    setTimeout(x => {
      this.filtrerTest = "month";
    }, 1000);
    setTimeout(x => {
      this.updateDiagram("month");
    }, 2000);

  }

  ngOnInit() {
    
    setTimeout(x => {
      this.renderChart();
      this.filtrerTest = "month";
    }, 1000);
    
  }




  renderChart() {
    this.doughChart = new Chart(this.doughCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Mat og drikke", "Bolig", "Klær og utsyr", "Annet"],
        datasets: [{
          data: [(this.calcServ.sumAllFoodAndDrink), 8600, this.calcServ.sumAllClothes, this.calcServ.sumAllOther], //Kategori data skal inn i dette arrayet!
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
            },
          }
        }]
      },
    })
  }

  updateDiagram(value) {

   
    let dataFoodAndDrink;
    let dataRent;
    let dataClothes;
    let dataAnnet;

    this.currentBalance = 16600;

    if (value == "day") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "day");

      console.log("Det er dag!!!!!!!!!!!!!")

        setTimeout(x => {

            dataRent = (8000 / 31);
            dataFoodAndDrink = this.calcServ.sumAllFoodAndDrink;
            dataClothes = this.calcServ.sumAllClothes;
            dataAnnet = this.calcServ.sumAllOther;

            this.sumTotalDay = dataFoodAndDrink + dataRent + dataClothes + dataAnnet
            this.expensesToShow = (this.sumTotalDay).toFixed(1);

            if (this.sumTotalDay > this.currentBalance / 31) {
              this.sumTotalDay = 100;

            } else {
              this.sumTotalDay = ((this.sumTotalDay) / (this.currentBalance) * (100) * (31)).toFixed(0);
            }

            this.currentBalance = (this.currentBalance / 31).toFixed(0);
            
      }, 500);

    } else if (value == "week") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "week");

      setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink); //.toPrecision(3)
          dataRent = (8000 / 4); //.toPrecision(4)
          dataClothes = (this.calcServ.sumAllClothes); //.toPrecision(2)
          dataAnnet = (this.calcServ.sumAllOther); //.toPrecision(2)

          this.expensesToShow = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);

          this.currentBalance = (this.currentBalance / 4).toFixed(0);

      }, 500);

    } else if (value == "month") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "month");

      setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink); //.toPrecision(3)
          dataRent = (8000); //.toPrecision(4)
          dataClothes = (this.calcServ.sumAllClothes); //.toPrecision(2)
          dataAnnet = (this.calcServ.sumAllOther); //.toPrecision(2)

          this.sumTotalMonth = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);
          this.expensesToShow = this.sumTotalMonth;

          if (this.sumTotalMonth > this.currentBalance) {
            this.sumTotalMonth = 100;
          } else {
            this.sumTotalMonth = ((this.sumTotalMonth / this.currentBalance * 100).toFixed(0))
          }

      }, 500);
    }


    setTimeout(x => {

      console.log("Er dataen riktig?: " + dataFoodAndDrink);
      console.log("Er dataen riktig?: " + dataRent);
      console.log("Er dataen riktig?: " + dataClothes);
      console.log("Er dataen riktig?: " + dataAnnet);

      this.doughChart.data.datasets[0].data[0] = dataFoodAndDrink;
      this.doughChart.data.datasets[0].data[1] = dataRent;
      this.doughChart.data.datasets[0].data[2] = dataClothes;
      this.doughChart.data.datasets[0].data[3] = dataAnnet;
      this.doughChart.update();

    }, 1000);

  }

}