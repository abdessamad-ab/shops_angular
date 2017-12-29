import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email;
  password;
  failedAuthentication;

  constructor(private http: HttpClient, private router: Router) { }

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
          console.log('in if user');
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
          console.log('failure: '+this.email+' '+this.password);
          this.failedAuthentication = true;
        }
      });
  }

}
