import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {AppService} from "../app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  failedAuthentication;

  constructor(private http: HttpClient, private router: Router, private _appService: AppService) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.router.navigate(["/nearbyShops"]);
    }

    this.failedAuthentication = false;
  }

  login(): void{
    this.http.get<User>(`http://localhost:8080/authentication?email=${this.email}&password=${this.password}`)
      .subscribe(user => {
        if(user){
          console.log(user);

          let curentUser = {
            username: user.username,
            token: btoa(`${user.email}:${user.password}`)
          };
          localStorage.setItem('currentUser', JSON.stringify(curentUser));
          this.router.navigate(["/nearbyShops"]);
          // reload navbar
          location.reload();
        }else{
          this.failedAuthentication = true;
        }
      },
        error => alert('Error:\n'+error.name));
  }

}
