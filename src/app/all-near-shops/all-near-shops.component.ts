import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Shop} from "../models/shop";

@Component({
  selector: 'app-all-near-shops',
  templateUrl: './all-near-shops.component.html',
  styleUrls: ['./all-near-shops.component.css']
})
export class AllNearShopsComponent implements OnInit {

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
      this._appService.getShops(`http://localhost:8080/shops/allNearby/${this.longitude}/${this.latitude}/`)
        .subscribe(shops => this.shops = shops);
    }
  }

}
