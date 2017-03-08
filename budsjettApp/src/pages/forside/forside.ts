import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase-provider';
import { Instillinger } from '../instillinger/instillinger';
import { LoginPage } from '../login/login';
import Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { CalculationsProvider } from '../../providers/calculations-provider';

import 'chart.js/src/chart.js';
declare var Chart;


@Component({
  selector: 'page-forside',
  templateUrl: 'forside.html',
})

export class Forside {
  
  public dateVarUpd;

  @ViewChild('canvas') doughCanvas;
  public doughChart: any;
 

  public instillinger = Instillinger;

  public expensesToShow: any;

  public sumTotalDay;
  public sumTotalWeek;
  public sumTotalMonth;
  public diagram;
  filtrerTest: string = "month";

  public currentBalance: any = 16600;
  public foodTotalTest = 0;

  public forkJoinedVal;



  constructor(
    public navCtrl: NavController,
    public authService: FirebaseProvider,
    public app: App,
    public calcServ: CalculationsProvider,
  ) {
    moment.locale();
    this.dateVarUpd = moment().format('MM/DD/YYYY');
    console.log("Forside constructor ran!");

    this.authService.af.auth.subscribe(function (user) {
      if (!user) {
        app.getRootNav().setRoot(LoginPage);
      }

      if (user){
        calcServ.clogInfo();
      }
    });
  }


  logout() {
    this.authService.doLogout();
  }

  ionViewDidEnter() {
    this.diagram = 'month';
    this.calcServ.sumTotalAll(this.dateVarUpd, "month");

    setTimeout(x => {
      this.updateDiagram("month");
    }, 1000);

  }

  ngOnInit() {
    
    setTimeout(x => {
      this.renderChart();
    }, 1000);
    
  }




  renderChart() {
    this.doughChart = new Chart(this.doughCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [],
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
            }
          }
        }]
      },
    })
  }

  updateDiagram(value) {
    let weekFoodAndDrink;
    let monthFoodAndDrink;
    let dayFoodAndDrink;

    let dayClothes;
    let weekClothes;
    let monthClothes;

    let dayOther;
    let weekOther;
    let monthOther;

    let dataFoodAndDrink;
    let dataRent;
    let dataClothes;
    let dataAnnet;
    this.currentBalance = 16600;

    let isDataReady1 = false;
    this.calcServ.initAmountsOf("matOgDrikke", day =>{
      dayFoodAndDrink = day;
      console.log("day: ", day);
    }, week =>{
      weekFoodAndDrink = week;
    }, month => {
      monthFoodAndDrink = month;
    }).then((val: boolean) => {isDataReady1 = val});

    let isDataReady2 = false;
    this.calcServ.initAmountsOf("annet", day =>{
      dayOther = day;
    }, week =>{
      weekOther = week;
    }, month => {
      monthOther = month;
    }).then((val: boolean) => {isDataReady2 = val});;

    let isDataReady3 = false;
    this.calcServ.initAmountsOf("klærOgUtstyr", day =>{
      dayClothes = day;
    }, week =>{
      weekClothes = week;
    }, month => {
      monthClothes = month;
    }).then((val: boolean) => {isDataReady3 = val});;

    let isAllDataReady = (isDataReady1 && isDataReady2 && isDataReady3);
    function waitForData(){
      if (isAllDataReady){
        if (value == "day") {

          console.log("Det er dag!!!!!!!!!!!!!")

          dataFoodAndDrink = dayFoodAndDrink;
          dataRent = (8000 / 31);
          dataClothes = dayClothes;
          dataAnnet = dayOther;

          this.sumTotalDay = dayFoodAndDrink + dataRent + dayClothes + dayOther;
          this.expensesToShow = (this.sumTotalDay).toFixed(1);

          if (this.sumTotalDay > this.currentBalance / 31) {
            this.sumTotalDay = 100;

          } else {
            this.sumTotalDay = ((this.sumTotalDay) / (this.currentBalance) * (100) * (31)).toFixed(0);
          }

            this.currentBalance = (this.currentBalance / 31).toFixed(0);
                

          } else if (value == "week") {

            dataFoodAndDrink = weekFoodAndDrink;
            dataRent = (8000 / 4);
            dataClothes = weekClothes;
            dataAnnet = weekOther;

            this.expensesToShow = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);

            this.currentBalance = (this.currentBalance / 4).toFixed(0);

            } else if (value == "month") {

              this.calcServ.sumTotalAll(this.dateVarUpd, "month");

              dataFoodAndDrink = monthFoodAndDrink;
              dataRent = (8000); //.toPrecision(4)
              dataClothes = monthClothes;
              dataAnnet = monthOther;

              this.sumTotalMonth = (dataFoodAndDrink + dataRent + dataClothes + dataAnnet).toFixed(0);
              this.expensesToShow = this.sumTotalMonth;

              if (this.sumTotalMonth > this.currentBalance) {
                this.sumTotalMonth = 100;
              } else {
                this.sumTotalMonth = ((this.sumTotalMonth / this.currentBalance * 100).toFixed(0))
              }
            }

            console.log("Er dataen(foodAndDrink) riktig?: " + dataFoodAndDrink);
            console.log("Er dataen(Rent) riktig?: " + dataRent);
            console.log("Er dataen(clothes) riktig?: " + dataClothes);
            console.log("Er dataen(other) riktig?: " + dataAnnet);

            this.doughChart.data.datasets[0].data[0] = dataFoodAndDrink * -1;
            this.doughChart.data.datasets[0].data[1] = dataRent * -1;
            this.doughChart.data.datasets[0].data[2] = dataClothes * -1;
            this.doughChart.data.datasets[0].data[3] = dataAnnet * -1;
            this.doughChart.update();

      } else{
          setTimeout(()=>{
            waitForData();
          }, 500);
      }

    }
    
  }

}