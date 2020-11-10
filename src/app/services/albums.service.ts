import { Album } from './../shared/album.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  // all properties of type subject is to inform other components that uses them that their
  // value has changed
  artistIdChanged = new Subject<string>();
  artistNameChanged = new Subject<string>();
  albumsChanged = new Subject<Album[]>();
  // here we access the token we saved in local storage and assign it to access_token property
  access_token = localStorage.getItem('access_token');
  albums: Album[];
  artistId: string;
  artistName: string;

  constructor(private http: HttpClient) {}
  // setIt is a function that updates the values of the artistId with the new gotten id
  // then we emit the id to a subject property
  setId(id: string) {
    this.artistId = id;
    this.artistIdChanged.next(id);
  }

  setAlbums(albums: Album[]) {
    this.albums = albums;
    this.albumsChanged.next(this.albums);
  }
  // setArtistNam and setAlbums do a similar job of the same as the setId function
  setArtistName(name: string) {
    this.artistName = name;
    this.artistNameChanged.next(this.artistName);
  }
  // returns the albums we stored
  getAlbums() {
    return this.albums;
  }
  // spotify requires a specific instructions for sending a get request to fetch albums
  artistAlbums(id: string) {
    // requested url is provided by spotify Web API, and we concatinate the id we've gotten from
    // the artistsAlbum function
    var requestUrl = 'https://api.spotify.com/v1/artists/' + id + '/albums';
    // custom api specification for header request with HttpHeaders
    var headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.access_token,
    });
    // append multiple parameters to the request with demanded filters and queries
    var params = new HttpParams();
    params = params.append('offset', '5');
    params = params.append('limit', '20');
    params = params.append('include_groups', 'album');
    params = params.append('market', 'ES');
    // return the get request with the requested url and the specified headers and params then
    //  to subscribe to it later in another component
    return this.http.get(requestUrl, {
      headers: headers,
      params: params,
    });
  }
}
