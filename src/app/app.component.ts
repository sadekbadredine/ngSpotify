import { AuthLoginService } from './services/authlogin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ngSpotify';

  constructor(private login: AuthLoginService){}

  ngOnInit(){

  }
}
