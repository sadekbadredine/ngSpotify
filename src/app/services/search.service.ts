import { Artist } from './../shared/artist.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SearchService {
    searchResult = new BehaviorSubject(null); 
    private requestUrl = 'https://api.spotify.com/v1/search';
    finalUrl: string;
    private access_token = localStorage.getItem('access_token');

    constructor(private http: HttpClient) { }

    searchArtist(str: string) {
        var headers = new HttpHeaders({
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + this.access_token
        });
        var params = new HttpParams();
        params = params.append('query',str);
        params = params.append('limit','8');
        params = params.append('type','artist');
        return this.http.get(this.requestUrl, {
            headers: headers,
            params: params
        });

    }

}