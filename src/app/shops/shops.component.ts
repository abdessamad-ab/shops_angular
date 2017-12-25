import { Component, OnInit } from '@angular/core';
import {Shop} from "../models/shop";
import {AppService} from "../app.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
})
export class ShopsComponent implements OnInit {

  shops: Shop[];


  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getShops("http://localhost:8080/shops/nearby/-6.75778/33.97468/username")
      .subscribe(shops => this.shops = shops);
  }

  likeShop(shopId: string){
    this._appService.getShops("http://localhost:8080/shops/likeShop/"+shopId+"/username")
      .subscribe(result => {
        if(result) {
          this._appService.getShops("http://localhost:8080/shops/nearby/-6.75778/33.97468/username")
            .subscribe(shops => this.shops = shops);
        }
      });
  }

  dislikeShop(shopId: string){
    this._appService.dislikeShop("http://localhost:8080/shops/dislikeShop/"+shopId+"/username")
      .subscribe(result => {
        // if the shop successfully removed
        if(result) {
          this._appService.getShops("http://localhost:8080/shops/nearby/-6.75778/33.97468/username")
            .subscribe(shops => this.shops = shops);
        }
      });
  }
}
