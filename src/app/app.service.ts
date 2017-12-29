import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "./models/shop";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

  constructor(private _http: HttpClient) {
  }

  getShops(resourceUrl): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token })
    };
    return this._http.get<Shop[]>(resourceUrl, httpOptions);
  }

  getAllShops(resourceUrl): Observable<Shop[]> {
    return this._http.get<Shop[]>(resourceUrl);
  }

  dislikeShop(resourceUrl): Observable<Shop> {
    return this._http.get<Shop>(resourceUrl);
  }
}
