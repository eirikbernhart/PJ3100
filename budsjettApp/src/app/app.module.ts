import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { Tabs } from '../pages/tabs/tabs';
import { Sparing } from '../pages/sparing/sparing';
import { NySparing } from '../pages/sparing/ny-sparing/ny-sparing';
import { Instillinger } from '../pages/instillinger/instillinger';
import { TidsLinje } from '../pages/tidslinje/tidslinje-page';
import { Kategoriser } from '../pages/kategoriser/kategoriser';
import { TidslinjeForKategori } from '../pages/tidslinje-for-kategori/tidslinje-for-kategori';
import { NyBruker } from '../pages/ny-bruker/ny-bruker';
import { LoginPage } from '../pages/login/login';

import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { RegisterPage } from '../pages/register/register';
import { SparingObjectDetailComponent } from '../pages/sparing/sparing-object-detail-component/sparing-object-detail-component';
import {WishlistService} from '../providers/wishlist-service';

import { CalculationsProvider } from '../providers/calculations-provider';
import { DataLogger } from '../providers/data-logger';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { FirebaseProvider } from '../providers/firebase-provider';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyCA6LHv_6rpptEslO8OdTwND920qlDAk6Y",
    authDomain: "budsjettapp.firebaseapp.com",
    databaseURL: "https://budsjettapp.firebaseio.com",
    storageBucket: "budsjettapp.appspot.com",
    messagingSenderId: "558185515963"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    Forside,
    Tabs,
    Sparing,
    NySparing,
    Instillinger,
    TidsLinje,
    Kategoriser,
    TidslinjeForKategori,
    NyBruker,
    LoginPage,
    ResetpwdPage,
    RegisterPage,
    SparingObjectDetailComponent,
    ProgressBarComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Forside,
    Sparing,
    NySparing,
    Tabs,
    Instillinger,
    TidsLinje,
    Kategoriser,
    TidslinjeForKategori,
    NyBruker,
    LoginPage,
    ResetpwdPage,
    RegisterPage,
    SparingObjectDetailComponent,
    ProgressBarComponent,
    
  ],
  providers: [
    FirebaseProvider,
    CalculationsProvider,
    WishlistService,
    DataLogger,
  ]
})
export class AppModule {}
