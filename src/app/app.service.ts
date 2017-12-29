import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "./models/shop";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {Router} from "@angular/router";

@Injectable()
export class AppService {

  constructor(private _http: HttpClient, private router: Router) {
  }

  /**
   * Nearby shops, excluding liked shops and disliked ones by
   * user less than 2 hours a go, sorted by distance, based on a position
   * given by longitude and latitude
   * @param longitude
   * @param latitude
   * @param username
   * @returns {Observable<Shop[]>}
   */
  getShops(longitude, latitude, username): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token})
    };
    return this._http.get<Shop[]>(`http://localhost:8080/shops/nearby/${longitude}/${latitude}/${username}`, httpOptions)
      .pipe(
        catchError(this.handleError('All shops', []))
      );
  }

  /**
   * all the shops sorted by distance, based on a position given by
   * longitude and latitude
   * @param longitude
   * @param latitude
   * @returns {Observable<Shop[]>}
   */
  getAllShops(longitude, latitude): Observable<Shop[]> {
    return this._http.get<Shop[]>(`http://localhost:8080/shops/allNearby/${longitude}/${latitude}/`)
      .pipe(
        catchError(this.handleError('All shops', []))
      );
  }

  /**
   * List of preferred shops by user
   * @param username
   * @returns {Observable<Shop[]>}
   */
  getPreferredShops(username): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token})
    };
    return this._http.get<Shop[]>(`http://localhost:8080/shops/likedShops/${username}`, httpOptions)
      .pipe(
        catchError(this.handleError('preferred shops', []))
      );
  }

  /**
   * Remove a shop from preferred shops of a user
   * @param shopId
   * @param username
   * @returns {Observable<Array | any>}
   */
  removelikedShop(shopId, username) {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token })
    };
    return this._http.delete<Shop[]>(`http://localhost:8080/shops/removeLikedShop/${shopId}/${username}`, httpOptions)
      .pipe(
        catchError(this.handleError('All shops', []))
      );
  }

  /**
   * Dislike a shop
   * @param shopId
   * @param username
   * @returns {Observable<Shop[]>}
   */
  dislikeShop(shopId, username): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token})
    };
    return this._http.put<Shop[]>(`http://localhost:8080/shops/dislikeShop/${shopId}/${username}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError('dislike', []))
      );
  }

  /**
   * Add a new preferred shop by user
   * @param shopId
   * @param username
   * @returns {Observable<Shop[]>}
   */
  likeShop(shopId, username): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token})
    };
    return this._http.put<Shop[]>(`http://localhost:8080/shops/likeShop/${shopId}/${username}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError('dislike', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      alert('Error:\n' + error.name);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * Redirect to login page if not authenticated
   */
  public verifyAuthentication() {
    if (!localStorage.getItem('currentUser')) {
      this.router.navigate(['/login']);
    }
  }
}
