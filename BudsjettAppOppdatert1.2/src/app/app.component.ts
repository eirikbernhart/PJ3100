import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { AngularFire, FirebaseAuth } from 'angularfire2';

import { LoginPage } from '../pages/login/login';
import { Forside } from '../pages/forside/forside';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage; //Default
 
  constructor(platform: Platform, af: AngularFire) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

       //"Cahces" that user is still logged in.
       af.auth.subscribe((auth) => {
        if(auth) {
           this.rootPage = TabsPage;
        } else {
           this.rootPage = LoginPage;
        }
      })
    });
  }
}
