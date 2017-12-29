import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopsComponent} from "./shops/shops.component";
import {PreferredShopsComponent} from "./preferred-shops/preferred-shops.component";
import {AllNearShopsComponent} from "./all-near-shops/all-near-shops.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  { path: '', redirectTo: 'allNearby', pathMatch: 'full' },
  { path: 'allNearby', component: AllNearShopsComponent },
  { path: 'nearbyShops', component: ShopsComponent },
  { path: 'preferredShops', component: PreferredShopsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
