import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthLoginService {
  // requestUrl derived from the spotfy web API
  private requestUrl = 'https://accounts.spotify.com/authorize';
  // clinet_id derived from a created spotify account
  private client_id = environment.spotifyClientId;
  // scopes derived from spotify web API
  private scopes = 'user-read-private user-read-email';
  // redirect_uri is my local host path where I want the server to redirect to
  private redirect_uri = 'http://localhost:4200/';

  constructor(private http: HttpClient) {}
  // generating a random string for the state of the request in its params and it gets as parameters
  // the length of the generated string
  generateRandomString(length: number) {
    // text will hold the generated string
    var text = '';
    // possible is the possible characters of the generated string
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // loop through all the characters
    for (var i = 0; i < length; i++) {
      // assign to text a character at a random position in the possible variable length times
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    // return the string
    return text;
  }
  // a function that extracts the url hash params and encode it to a natural string
  getHashParams() {
    // define the type of the params to be extracted
    let access_token: string;
    let token_type: string;
    let expires_in: number;
    // state variable is to be compared with the state sent with the request to see if it's sent from the
    // same computer
    let state: string;
    // create a hashParams objects that holds the params
    var hashParams = {
      access_token,
      token_type,
      expires_in,
      state,
    };
    // created two variables that holds the decoding symbols
    var e,
      r = /([^&#;=]+)=?([^&;]*)/g,
      // get the url of the window strating from position 23 where the params start
      q = window.location.href.substring(23);
    // while loop starts where the params start, then searches for a match of the symbol in the
    // specified string and returns an array of results and then decode the symbole and then stores
    // result in hashParams
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    // return hash params
    // this is a coppied function from google to decode a url
    return hashParams;
  }
  // login function
  login() {
    var state = this.generateRandomString(16);
    var url = this.requestUrl;
    // concatinate the requestUrl string with encoded params
    url += '?scope=' + encodeURIComponent(this.scopes);
    // define a response type as token to get the response from server of a token params as defined
    // in hasParams above
    url += '&response_type=token';
    url += '&redirect_uri=' + encodeURIComponent(this.redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&client_id=' + encodeURIComponent(this.client_id);
    // show dialog is to always show the login page even if the user if logged in
    url += '&show_dialog=true';
    // store the generated state key in local storage to compare it later when the response arrives
    var stateKey = 'spotify_auth_state';
    localStorage.setItem(stateKey, state);
    // open a new window with the final url with the desired params to go to the login page
    window.location.assign(url);
  }
}
