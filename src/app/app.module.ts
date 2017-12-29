import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import {AppService} from "./app.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { PreferredShopsComponent } from './preferred-shops/preferred-shops.component';
import { AppRoutingModule } from './/app-routing.module';
import { AllNearShopsComponent } from './all-near-shops/all-near-shops.component';
import { GeolocationService } from './geolocation.service';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    PreferredShopsComponent,
    AllNearShopsComponent,
    LoginComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AppService, GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
