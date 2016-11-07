import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the TidslinjeForKategori page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tidslinje-for-kategori',
  templateUrl: 'tidslinje-for-kategori.html'
})
export class TidslinjeForKategori {
  category: any;

  constructor(public navParams: NavParams) {
    this.category = navParams.data;
  }

  ionViewDidLoad() {
    console.log('Hello TidslinjeForKategori Page');
  }

}
