import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { Tabs } from '../pages/tabs/tabs';
import { Sparing } from '../pages/sparing/sparing';
import { NySparing } from '../pages/ny-sparing/ny-sparing';
import { Instillinger } from '../pages/instillinger/instillinger';
import { TidsLinje } from '../pages/tidslinje/tidslinje-page';
import { Kategoriser } from '../pages/kategoriser/kategoriser';
import { TidslinjeForKategori } from '../pages/tidslinje-for-kategori/tidslinje-for-kategori';
<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
import { SparingObjectDetailComponent } from '../pages/sparing-object-detail-component/sparing-object-detail-component';

import { SparingService } from '../app/sparing-service';
;import { CalculationsProvider } from '../providers/calculations-provider';
<<<<<<< HEAD

=======
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
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
<<<<<<< HEAD

    TidslinjeForKategori,
	SparingObjectDetailComponent

=======
    TidslinjeForKategori,
	SparingObjectDetailComponent
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
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
<<<<<<< HEAD
    TidslinjeForKategori
  ],
  
=======
    TidslinjeForKategori,
	  
  ],
>>>>>>> e0da23be4f47a2cb94756eacff29a820ed0776d8
  providers: [
	SparingService,
    FirebaseProvider,
    CalculationsProvider
  ]
})
export class AppModule {}
