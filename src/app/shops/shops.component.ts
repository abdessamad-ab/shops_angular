import {Component, OnInit} from '@angular/core';
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
  currentUser;

  constructor(private _appService: AppService, private geolocationService: GeolocationService) {
    this._appService.verifyAuthentication();
  }

  ngOnInit() {
    let self = this;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    /**
     * If the user cleared the Local storage manually
     */
    if (localStorage.getItem('longitude') == null || localStorage.getItem('latitude') == null) {
      self.geolocationService.getLocation({}).subscribe(
        function (position) {
          localStorage.setItem('longitude', position.coords.longitude);
          localStorage.setItem('latitude', position.coords.latitude);
        },
        function (error) {
          alert('Geolocation error:\n' + error);
        },
        function () {
          self.longitude = localStorage.getItem('longitude');
          self.latitude = localStorage.getItem('latitude');
          self._appService.getShops(self.longitude, self.latitude, self.currentUser.username)
            .subscribe(shops => self.shops = shops);
        }
      );
    }
    else {
      this.longitude = localStorage.getItem('longitude');
      this.latitude = localStorage.getItem('latitude');
      this._appService.getShops(self.longitude, self.latitude, self.currentUser.username)
        .subscribe(shops => this.shops = shops);
    }

  }

  likeShop(shopId: string){
    this._appService.verifyAuthentication();
    let self = this;
    this._appService.likeShop(shopId, this.currentUser.username)
      .subscribe(result => {
        /**
         * if the shop successfully added to preferred list
         * refresh shops list
         */
        if (result) {
          self.refreshShopsList();
        }
      });
  }

  dislikeShop(shopId: string) {
    this._appService.verifyAuthentication();
    let self = this;
    this._appService.dislikeShop(shopId, this.currentUser.username)
      .subscribe(result => {
        /**
         * if the shop successfully removed
         * refresh shops list
         */
        if (result) {
          self.refreshShopsList();
        }
      });
  }

  private refreshShopsList(){
    this._appService.getShops(this.longitude, this.latitude, this.currentUser.username)
      .subscribe(shops => this.shops = shops);
  }
}
