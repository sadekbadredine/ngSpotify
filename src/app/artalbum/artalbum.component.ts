import { Router } from '@angular/router';
import { AlbumsService } from './../services/albums.service';
import { Component, OnInit } from '@angular/core';
import { Album } from '../shared/album.model';

@Component({
  selector: 'app-artalbum',
  templateUrl: './artalbum.component.html',
  styleUrls: ['./artalbum.component.css']
})
export class ArtalbumComponent implements OnInit {
  albums: Album[];
  artistName: string;

  constructor(
    private albumsService: AlbumsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.albums = this.albumsService.getAlbums(); 
    this.artistName = this.albumsService.artistName;  
  }

  goToSpotify(url: string){
    window.open(url)
  }

}
