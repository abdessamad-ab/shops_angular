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


  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getShops("http://localhost:8080/shops/allNearby/-6.75778/33.97468/")
      .subscribe(shops => this.shops = shops);
  }

}
