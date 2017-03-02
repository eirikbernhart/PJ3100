import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods  } from 'angularfire2';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { Forside } from '../pages/forside/forside';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { Instillinger } from '../pages/instillinger/instillinger';
import { AuthService } from '../providers/auth-service';

import { Sparing } from '../pages/sparing/sparing';
import { SparingObjectDetailComponent } from '../pages/sparing-object-detail-component/sparing-object-detail-component';
import { NySparing } from '../pages/ny-sparing/ny-sparing';

import { TidsLinje } from '../pages/tidslinje/tidslinje-page';
import { TidslinjeForKategori } from '../pages/tidslinje-for-kategori/tidslinje-for-kategori';

import { TimelineService } from '../providers/timeline-service';
import { CalculationService } from '../providers/calculation-service';
import { WishlistService } from '../providers/wishlist-service';

import { Kategoriser } from '../pages/kategoriser/kategoriser';

import { AboutPage } from '../pages/about/about';

import { NyForingPage } from '../pages/ny-foring/ny-foring';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';


//Initialize firebase by adding firebase config
export const firebaseConfig = {
    apiKey: "AIzaSyApZ7Ru9OiyoVm0vEcw1XwUTMBT9sDbR0E",
    authDomain: "testapp-70fdb.firebaseapp.com",
    databaseURL: "https://testapp-70fdb.firebaseio.com",
    storageBucket: "testapp-70fdb.appspot.com",
    messagingSenderId: "708646150424"
  };

  const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }

firebase.initializeApp(firebaseConfig);



@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Forside,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    Sparing,
    SparingObjectDetailComponent,
    NySparing,
    TidsLinje,
    TidslinjeForKategori,
    Instillinger,
    Kategoriser,
    AboutPage,
    ProgressBarComponent,
    NyForingPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Forside,
    LoginPage,
    RegisterPage,
    ResetpwdPage,
    Sparing,
    NySparing,
    TidsLinje,
    TidslinjeForKategori,
    Instillinger,
    Kategoriser,
    AboutPage,
    NyForingPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  AuthService,
  TimelineService, 
  CalculationService, 
  WishlistService
  ]
})

export class AppModule {}
