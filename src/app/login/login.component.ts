import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hash: {token: string, state: string};

  constructor(
    private alc: AuthLoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    let params = this.alc.getHashParams();
    if (typeof(params.access_token) == 'undefined') {
      return; 
    } else {
      localStorage.setItem('access_token',params.access_token);
      this.router.navigate(['artsearch']);
    }
    localStorage.removeItem('str')
  }

  login(){
    this.alc.login();
  }

}
