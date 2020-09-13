import { Router } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ArtistsService } from '../services/artists.service';
import { AlbumsService } from '../services/albums.service';
import { Artist } from '../shared/artist.model';

@Component({
  selector: 'app-artbrowse',
  templateUrl: './art-browse.component.html',
  styleUrls: ['./art-browse.component.css']
})
export class ArtBrowseComponent implements OnInit, DoCheck {
  // an array of type Artist to hold the list of artists 
  artists: Artist[];

  constructor(
    // the needed services to use in this component
    private artistService: ArtistsService,
    private albumsService: AlbumsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // fetch the list of artists from the artist service and assign them 
    // to the artists array when the component intializes
    this.artists = this.artistService.getArtists();
  }

  ngDoCheck(){
    
    // subscribe to the artistsChanged Subject poperty to extract the new emitted array of type
    // Artist and overwrite the current artist list in the class whenever the component detects
    // a change 
    this.artistService.artistsChanged.subscribe(
      (artists: Artist[])=>{
        this.artists = artists;
      }
    )
  }

  //  Another way of assigning multi grid column class
  // onResize(event:any) {
  //   let width = event.target.innerWidth;
  //   this.screenWidth = width;
  // }
  // getClass(){
  //   if (this.screenWidth >= 992) {
  //     return 'col-lg-3'
  //   }
  //   if (this.screenWidth >= 768) {
  //     return 'col-md-4'
  //   }
  //   if (this.screenWidth >= 576) {
  //     return 'col-sm-6'
  //   }
  //   if (this.screenWidth < 576) {
  //     return 'col-xs-12'
  //   }
  // }

  getWidth(width: number){
    return width+'%';
    // returns a percentage to the css width property on the html element that holds 
    // the ngStyle directive
  }
  // get the artist id and name from the extracted artist element 
  getArtist(id: string, name: string) {
    // pass the id of the artist to the artistAlbum Get method of the album service and subscribe
    // to it and extract the returned Jalbum object
    this.albumsService.artistAlbums(id).subscribe(
      (albumObject: any)=>{
        // check if the item array of the album object has no elements and alert the user with 
        // the proper message
        if (albumObject.items.length == 0){
          window.alert('this artist has no albums');
        } else {
          // if the array is not empty, pass it to the setAlbums function of the album service 
          // and pass the name argument of getArtist function and pass it to setArtistName function
          // in the album service and then navigate to the artalbum component with the router service
          this.albumsService.setAlbums(albumObject.items);
          this.albumsService.setArtistName(name);
          this.router.navigate(['/artalbum']);
        }
      },
      // if the Get method has an error then log it to the console
      error=>{
        console.log(error);
      }
    );
  }
}
