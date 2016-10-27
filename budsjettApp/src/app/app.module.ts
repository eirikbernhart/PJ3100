import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Sparing } from '../pages/sparing/sparing';
import { NySparing } from '../pages/ny-sparing/ny-sparing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Sparing,
    NySparing
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Sparing,
    NySparing
  ],
  providers: []
})
export class AppModule {}
