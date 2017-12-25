import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Shop} from "../models/shop";

@Component({
  selector: 'app-preferred-shops',
  templateUrl: './preferred-shops.component.html',
  styleUrls: ['./preferred-shops.component.css']
})
export class PreferredShopsComponent implements OnInit {

  preferredShops: Shop[];


  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getShops("http://localhost:8080/shops/likedShops/username")
      .subscribe(shops => this.preferredShops = shops);
  }

  removelikedShop(shopId: string){
    this._appService.getShops("http://localhost:8080/shops/removeLikedShop/"+shopId+"/username")
      .subscribe(shops => this.preferredShops = shops);
  }

}
