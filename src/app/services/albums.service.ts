import { Album } from './../shared/album.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AlbumsService {
    artistIdChanged = new Subject<string>();
    artistNameChanged = new Subject<string>();
    albumsChanged = new Subject<Album[]>();
    
    access_token = localStorage.getItem('access_token');
    albums: Album[];
    artistId: string;
    artistName: string; 

    constructor(private http: HttpClient) { }

    setId(id: string){
        this.artistId = id;
        this.artistIdChanged.next(id);
    }

    setAlbums(albums :Album[]){
        this.albums = albums;
        this.albumsChanged.next(this.albums);
    }

    setArtistName(name: string){
        this.artistName = name;
        this.artistNameChanged.next(this.artistName);
    }

    getAlbums(){
        return this.albums;
    }

    artistAlbums(id: string) {
        var requestUrl = 
        'https://api.spotify.com/v1/artists/' + id + '/albums';
        var headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.access_token    
        });
        var params = new HttpParams();
        params = params.append('offset','5') 
        params = params.append('limit','20') 
        params = params.append('include_groups','album') 
        params = params.append('market','ES') 
        return this.http.get(requestUrl, {
            headers: headers,
            params: params
        });
    }

}