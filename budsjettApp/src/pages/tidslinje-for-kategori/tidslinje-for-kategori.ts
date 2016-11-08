import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFire } from 'angularfire2'

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
  headerTitle: string;
  listings: FirebaseListObservable<any>;

  constructor(public navParams: NavParams, private af: AngularFire) {
    this.category = navParams.data;
    var headerTitle_ = this.category.title.replace( /([A-Z])/g, " $1" );
    this.headerTitle = headerTitle_.charAt(0).toUpperCase() + headerTitle_.slice(1);

    this.listings = af.database.list(
      '/' + this.category.incomeOrExpense + 
      '/' + this.category.title);
  }

  ionViewDidLoad() {
    console.log('/' + this.category.incomeOrExpense + 
      '/' + this.category.title);
  }

}
