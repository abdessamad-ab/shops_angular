import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Shop} from "../models/shop";
import {GeolocationService} from "../geolocation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-near-shops',
  templateUrl: './all-near-shops.component.html',
  styleUrls: ['./all-near-shops.component.css']
})
export class AllNearShopsComponent implements OnInit {

  shops: Shop[];
  longitude: string;
  latitude: string;
  constructor(private _appService: AppService, private geolocationService: GeolocationService, private router: Router) {
    if(localStorage.getItem('currentUser')){
      this.router.navigate(["nearbyShops"]);
    }
  }

  ngOnInit() {
    let self = this;
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
          self._appService.getAllShops(`http://localhost:8080/shops/allNearby/${self.longitude}/${self.latitude}/`)
            .subscribe(shops => self.shops = shops);
        }
      );
  }
  else{
      this.longitude = localStorage.getItem('longitude');
      this.latitude = localStorage.getItem('latitude');
      this._appService.getAllShops(`http://localhost:8080/shops/allNearby/${this.longitude}/${this.latitude}/`)
        .subscribe(shops => this.shops = shops);
    }
  }

}
