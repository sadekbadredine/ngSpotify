import { Router } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ArtistsService } from '../services/artists.service';
import { AlbumsService } from '../services/albums.service';
import { Artist } from '../shared/artist.model';
import { map } from 'rxjs/operators';
import { Album } from '../shared/album.model';

@Component({
  selector: 'app-artbrowse',
  templateUrl: './artbrowse.component.html',
  styleUrls: ['./artbrowse.component.css']
})
export class ArtbrowseComponent implements OnInit, DoCheck {
  artists: Artist[];
  artistId: string;
  constructor(
    private artistService: ArtistsService,
    private albumsService: AlbumsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.artists = this.artistService.getArtists()
    // console.log(this.artistService.getArtists());
    
  }

  ngDoCheck(){
    this.artistService.artistsChanged.subscribe(
      artists=>{
        this.artists = artists;
      }
    )
  }

  getWidth(width: number){
    return width+'%'
  }

  getArtist(id: string, name: string) {
    this.albumsService.artistAlbums(id).subscribe(
      (albumObject: any)=>{
        this.albumsService.setAlbums(albumObject.items);
        this.albumsService.setArtistName(name);
        this.router.navigate(['/artalbum']);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
