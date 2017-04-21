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
            'rgba(40, 126, 212, 0.5)',
            'rgba(192,183,244, 0.7)',
            'rgba(255,165,0, 0.4)',
            'rgba(0,153,135, 0.4)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(137, 40, 212, 0.5)',
            'rgba(40, 126, 212, 0.5)',
            'rgba(212, 126, 40, 0.5)',
            'rgba(40, 212, 183, 0.5)',
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

    this.currentBalance;

    if (value == "day") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "day");

      setTimeout(x => {
        dataFoodAndDrink = this.calcServ.sumAllFoodAndDrink;
        dataClothes = this.calcServ.sumAllClothes;
        dataAnnet = this.calcServ.sumAllOther;
      }, 500);
/*
        setTimeout(x => {

            dataRent = (8000 / 31);
            dataFoodAndDrink = this.calcServ.sumAllFoodAndDrink;
            dataClothes = this.calcServ.sumAllClothes;
            dataAnnet = this.calcServ.sumAllOther;

            this.sumTotalDay = dataFoodAndDrink + dataRent + dataClothes + dataAnnet;
            this.expensesToShow = (this.sumTotalDay);
            this.currentBalance = dataRent;

            this.currentBalance = Math.round(this.currentBalance);
            this.sumTotalDay = Math.round(this.sumTotalDay/this.currentBalance); // Verdi for progressbar
            this.expensesToShow = Math.round(this.expensesToShow);
            
      }, 1000);
*/
    } else if (value == "week") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "week");

      setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink);
          dataRent = (8000 / 4);
          dataClothes = (this.calcServ.sumAllClothes);
          dataAnnet = (this.calcServ.sumAllOther);

          this.expensesToShow = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet);
          this.sumTotalWeek = this.expensesToShow;
          this.currentBalance = (this.currentBalance / 4);

          this.currentBalance = Math.round(this.currentBalance);
          this.sumTotalWeek = Math.round(this.sumTotalWeek/this.currentBalance); // Verdi for progressbar
          this.expensesToShow = Math.round(this.expensesToShow);

      }, 500);

    } else if (value == "month") {

      this.calcServ.sumTotalAll(this.dateVarUpd, "month");

      setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink);
          dataRent = (8000);
          dataClothes = (this.calcServ.sumAllClothes);
          dataAnnet = (this.calcServ.sumAllOther);

          this.sumTotalMonth = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet)
          this.expensesToShow = this.sumTotalMonth;

          this.currentBalance = Math.round(this.currentBalance);
          this.sumTotalMonth = Math.round(this.sumTotalMonth/this.currentBalance); // Verdi for progressbar
          this.expensesToShow = Math.round(this.expensesToShow);

      }, 500);
    }
    
    setTimeout(x => {

          dataFoodAndDrink = (this.calcServ.sumAllFoodAndDrink);
          dataRent = (8000);
          dataClothes = (this.calcServ.sumAllClothes);
          dataAnnet = (this.calcServ.sumAllOther);

          let total = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet);
          this.expensesToShow = total;

          let income = 0;
          let incomeObservable = this.calcServ.af.database.list('/userData/' + this.calcServ.currentUser.uid + '/income');

          incomeObservable.map(list => {
            for (var key in list){
              income += list[key].amount;
            }
          });

          //if (income = 0) income = 1;
          this.currentBalance = income;

          this.currentBalance = Math.round(this.currentBalance);
          this.sumTotalMonth = Math.round(this.sumTotalMonth/this.currentBalance); // Verdi for progressbar
          this.sumTotalWeek = Math.round(this.sumTotalWeek/this.currentBalance);
          this.sumTotalDay = Math.round(this.sumTotalDay/this.currentBalance);
          this.expensesToShow = Math.round(this.expensesToShow);

      }, 500);


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