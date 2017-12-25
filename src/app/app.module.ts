import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShopsComponent } from './shops/shops.component';
import {AppService} from "./app.service";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import { PreferredShopsComponent } from './preferred-shops/preferred-shops.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ShopsComponent,
    PreferredShopsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
