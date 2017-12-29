import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  authenticated: boolean;

  constructor(private router: Router) {
    console.log('constr nav');
  }

  ngOnInit() {
    this.authenticated = localStorage.getItem('currentUser') ? true : false;
    console.log('auth: '+this.authenticated);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.authenticated = false;
    this.router.navigate(["/login"]);
  }

}
