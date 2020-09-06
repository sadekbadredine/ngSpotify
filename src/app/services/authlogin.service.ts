import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
  state: any;
}

@Injectable({ providedIn: 'root' })
export class AuthLoginService {
  hashchange = new BehaviorSubject(null);

  private requestUrl = 'https://accounts.spotify.com/authorize';
  private client_id = '5147216b7ebb4a138d0cdaf7fa2661d0';
  private client_secret = '003d794536304a0891f34f5ac2c61d80';
  private scopes = 'user-read-private user-read-email'
  private redirect_uri = 'http://localhost:4200/';
  private state = '';

  constructor(private router: Router,private http: HttpClient) { }
  
  generateRandomString(length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  getHashParams() {
    let access_token: string;
    let token_type: string;
    let expires_in: number;
    let state: string;

    var hashParams = {
      access_token,
      token_type,
      expires_in,
      state
    };
    var e, r = /([^&#;=]+)=?([^&;]*)/g,
      q = window.location.href.substring(23);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  login() {
    var headers = new HttpHeaders({
      'Content-Type': 'text/plain'
  });
    var state = this.generateRandomString(16);

    var url = this.requestUrl;
    url += '?scope=' + encodeURIComponent(this.scopes);
    url += '&response_type=token';
    url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&client_id=' + encodeURIComponent(this.client_id);
    url += '&show_dialog=true';

    var stateKey = 'spotify_auth_state';
    localStorage.setItem(stateKey, state);

    window.location.assign(url);
    // return this.http.get(url, {
    //   responseType: 'text',
    //   headers:headers
    // })
  }

}