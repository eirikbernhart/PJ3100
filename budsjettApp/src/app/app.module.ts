import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Forside } from '../pages/forside/forside';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    Forside,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Forside,
    HomePage
  ],
  providers: []
})
export class AppModule {}
