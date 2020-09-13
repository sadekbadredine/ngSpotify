import { AlbumsService } from '../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artalbum',
  templateUrl: './art-album.component.html',
  styleUrls: ['./art-album.component.css']
})
export class ArtAlbumComponent implements OnInit {
  // an array of type album to hold the list of albums
  albums: Observable<{albums: Album[]}>;
  artistName: string;

  constructor(
    private albumsService: AlbumsService,
    private store: Store<fromApp.AppState>
    ) { }
  
  ngOnInit(): void {
    //get the albums of the artists from the album service get method when the components initializes
    // this.albums = this.albumsService.getAlbums();
    this.albums = this.store.select('albums')
    // get the name of the artist from the album service 
    this.artistName = this.albumsService.artistName;  
  }

  goToSpotify(url: string){
    // on clicking on the album card, opnens a new window with the extracted url 
    // of the single album
    window.open(url)
  }

}
