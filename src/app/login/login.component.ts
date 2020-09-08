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
    // let hash =  window.location.href;
    // console.log(hash);
    let params = this.alc.getHashParams();
    // console.log(params.access_token);
    
    if (typeof(params.access_token) == 'undefined') {
      console.log('NO HASH YET'); 
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
