import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SearchService {
    // requesUrl is derived from spotify web API
    private requestUrl = 'https://api.spotify.com/v1/search';
    // access_token is derived from the local storage
    private access_token = localStorage.getItem('access_token');

    constructor(private http: HttpClient) { }
    // searchArtist gets the to be searched string as parameter
    searchArtist(str: string) {
        // headers is an HttpHeaders object that holds the required headers to be sent in the request
        var headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.access_token
        });
        // params is an HttpParams object that holds the required and desired params to be sent 
        var params = new HttpParams();
        params = params.append('query',str);
        params = params.append('limit','8');
        params = params.append('type','artist');
        // return the get request with the request url and the required headers and params to
        // subscribe to it later in another component
        return this.http.get(this.requestUrl, {
            headers: headers,
            params: params
        });

    }

}