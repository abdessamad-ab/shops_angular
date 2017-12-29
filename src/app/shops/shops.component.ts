import { Component, OnInit } from '@angular/core';
import {Shop} from "../models/shop";
import {AppService} from "../app.service";
import {GeolocationService} from "../geolocation.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css'],
})
export class ShopsComponent implements OnInit {

  shops: Shop[];
  longitude: string;
  latitude: string;

  constructor(private _appService: AppService, private geolocationService: GeolocationService) { }

  ngOnInit() {
    let self = this,
      current = JSON.parse(localStorage.getItem('currentUser'));

    /**
     * If the user cleared the Local storage manually
     */
    if(localStorage.getItem('longitude') == null || localStorage.getItem('latitude') == null){
      self.geolocationService.getLocation({}).subscribe(
        function(position) {
          localStorage.setItem('longitude', position.coords.longitude);
          localStorage.setItem('latitude', position.coords.latitude);
        },
        function(error) {
          alert('Geolocation error:\n'+error);
        },
        function() {
          self.longitude = localStorage.getItem('longitude');
          self.latitude = localStorage.getItem('latitude');
          self._appService.getShops(`http://localhost:8080/shops/nearby/${self.longitude}/${self.latitude}/${current.username}`)
            .subscribe(shops => self.shops = shops);
        }
      );
    }
    else{
      this.longitude = localStorage.getItem('longitude');
      this.latitude = localStorage.getItem('latitude');
      this._appService.getShops(`http://localhost:8080/shops/nearby/${this.longitude}/${this.latitude}/${current.username}`)
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
