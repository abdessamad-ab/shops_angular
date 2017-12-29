import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email;
  password;
  username;
  emptyField = false;
  alreadyExist = false;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(["/nearbyShops"]);
    }
  }

  register(): void{
    if(this.email.trim().length === 0 || this.password.trim().length === 0 || this.username.trim().length === 0){
      this.emptyField = true;
    }
    else{
      let httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      },
        self = this;
      this.http.post(`http://localhost:8080/register`, {'email': self.email, 'password':self.password, 'username': self.username}, httpOptions)
        .subscribe(result => {
            if (result) {
              console.log(result);
              let curentUser = {
                username: self.username,
                token: btoa(`${self.email}:${self.password}`)
              };
              localStorage.setItem('currentUser', JSON.stringify(curentUser));
              self.router.navigate(["/nearbyShops"]);
              // reload navbar
              location.reload();
            }
            else{
              self.alreadyExist = true;
            }
          },
          error => alert('Error:\n' + error.name));
    }
  }
}
