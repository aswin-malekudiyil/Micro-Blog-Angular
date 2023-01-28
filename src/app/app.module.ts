import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { ViewblogPageModule } from './viewblog/viewblog.module';
import { VerifyPipe } from './verify.pipe';
import { VerifyPageModule } from './verify/verify.module';


@NgModule({
  declarations: [AppComponent, VerifyPipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule, AngularFireModule.initializeApp(environment.firebase), AngularFireStorageModule, ViewblogPageModule, VerifyPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
