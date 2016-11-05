import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuth } from 'angularfire2';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseProvider {
  private af: AngularFire;
  private auth: FirebaseAuth;

  public ubehandlet: FirebaseListObservable<any>;
  public hovedkategorier: FirebaseListObservable<any>;

  constructor(public http: Http) {

    this.auth.subscribe((data) => {
      if(data) {
        this.ubehandlet = this.af.database.list('/ubehandlet');
        this.hovedkategorier = this.af.database.list('/hovedkategorier');
      }
    });
  }
    
}
