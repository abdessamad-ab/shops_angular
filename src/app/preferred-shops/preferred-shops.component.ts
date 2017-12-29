import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Shop} from "../models/shop";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.css']
})
export class PreferredShopsComponent implements OnInit {

  preferredShops: Shop[];
  currentUser;

  constructor(private _appService: AppService) {
    this._appService.verifyAuthentication();
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._appService.getPreferredShops(this.currentUser.username)
      .subscribe(shops => this.preferredShops = shops);
  }

  removelikedShop(shopId: string){
    this._appService.verifyAuthentication();
    this._appService.removelikedShop(shopId, this.currentUser.username)
      .subscribe(shops => this.preferredShops = shops);
  }

}
