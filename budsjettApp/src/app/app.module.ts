import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NyFoering } from '../pages/ny-foering/ny-foering';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NyFoering
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NyFoering
  ],
  providers: []
})
export class AppModule {}
