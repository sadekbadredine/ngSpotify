import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from '../services/authlogin.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    // the needed services in the component
    private alc: AuthLoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // the localhost:4200/ starts from this component, so when it loads, it's gonna fetch any existing
    // token in the has of the url
    // after a successfull login and when the user is redirected to the desired uri , spotify web API
    // sends back a response as a hash params concatinated with the redirect uri, so now we can decode
    // and extract the params and work with them 
    let params = this.alc.getHashParams();
    // getHashParams returns an object which has information about the token 
    if (typeof(params.access_token) == 'undefined') {
      // so if dont have a token or token is undefined then do nothing
      return; 
    } else {
      // if we have a token , we assign it to the access_token item in the local storage 
      localStorage.setItem('access_token',params.access_token);
      // then we navigate away to art-search component
      this.router.navigate(['artsearch']);
    }
    // because we want to have the search result when we navigate back from the art album component to 
    // the art search which it fetches the last search string from the local storage, we need to remove
    // it from the local storage when we login to the app to not having a loaded resuls whithout intention
    // to be loaded
    localStorage.removeItem('str')
  }
  // login function executs the login function of the alc service
  login(){
    this.alc.login();
  }

}
