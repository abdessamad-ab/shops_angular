import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "./models/shop";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class AppService {

  constructor(private _http: HttpClient) {
  }

  getShops(resourceUrl): Observable<Shop[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': "Basic " + JSON.parse(localStorage.getItem('currentUser')).token })
    };
    return this._http.get<Shop[]>(resourceUrl, httpOptions)
      .pipe(
        catchError(this.handleError('All shops', []))
      );
  }

  getAllShops(resourceUrl): Observable<Shop[]> {
    return this._http.get<Shop[]>(resourceUrl)
      .pipe(
        catchError(this.handleError('All shops', []))
      );
  }

  dislikeShop(resourceUrl): Observable<Shop[]> {
    return this._http.get<Shop[]>(resourceUrl)
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
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      alert('Error:\n'+error.name);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
