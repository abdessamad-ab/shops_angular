import {Component, OnInit} from '@angular/core';
import {GeolocationService} from "./geolocation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  longitude: string;
  latitude: string;
  constructor(private geolocationService: GeolocationService){

  }

  ngOnInit(): void {
    console.log('init app');
    this.geolocationService.getLocation({}).subscribe(
      function(position) {
        localStorage.setItem('longitude', position.coords.longitude);
        localStorage.setItem('latitude', position.coords.latitude);

        console.log('app: localStorage set');
      },
      function(error) {
        alert('Geolocation error:\n'+error);
      },
      function() {
      }
    );


  }
}
