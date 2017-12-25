import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "./models/shop";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private _http: HttpClient) { }

  getShops(resourceUrl): Observable<Shop[]>{
    return this._http.get<Shop[]>(resourceUrl);
  }
  dislikeShop(resourceUrl): Observable<Shop>{
    return this._http.get<Shop>(resourceUrl);
  }
}
