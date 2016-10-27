import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AlertProvider } from '../providers/alert-provider';
import { TestPage } from '../pages/test-page/test-page';

@NgModule({
  declarations: [
    MyApp,
	TestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	TestPage
  ],
  providers: [AlertProvider]
})
export class AppModule {}
