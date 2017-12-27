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
  longitude: string;
  latitude: string;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    /**
     * If the user cleared the Local storage manually
     */
    if(localStorage.getItem('longitude') == null || localStorage.getItem('latitude') == null){
      alert('coordinates not available, reload the page');
    }
    else{
      this.longitude = localStorage.getItem('longitude');
      this.latitude = localStorage.getItem('latitude');
      this._appService.getShops(`http://localhost:8080/shops/nearby/${this.longitude}/${this.latitude}/username`)
        .subscribe(shops => this.shops = shops);
    }

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
