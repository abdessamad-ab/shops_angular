import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopsComponent} from "./shops/shops.component";
import {PreferredShopsComponent} from "./preferred-shops/preferred-shops.component";

const routes: Routes = [
  { path: '', redirectTo: 'nearbyShops', pathMatch: 'full' },
  { path: 'nearbyShops', component: ShopsComponent },
  { path: 'preferredShops', component: PreferredShopsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
