import { AlbumsService } from '../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.model';

@Component({
  selector: 'app-artalbum',
  templateUrl: './art-album.component.html',
  styleUrls: ['./art-album.component.css']
})
export class ArtAlbumComponent implements OnInit {
  // an array of type album to hold the list of albums
  albums: Album[];
  artistName: string;

  constructor(
    private albumsService: AlbumsService
    ) { }
  
  ngOnInit(): void {
    //get the albums of the artists from the album service get method when the components initializes
    this.albums = this.albumsService.getAlbums();
    // get the name of the artist from the album service 
    this.artistName = this.albumsService.artistName;  
  }

  goToSpotify(url: string){
    // on clicking on the album card, opnens a new window with the extracted url 
    // of the single album
    window.open(url)
  }

}
