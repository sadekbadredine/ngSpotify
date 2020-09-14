import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { Artist } from '../shared/artist.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AlbumsActions from '../art-album/store/albums.actions'
import * as fromApp from '../store/app.reducer'
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-artbrowse',
  templateUrl: './art-browse.component.html',
  styleUrls: ['./art-browse.component.css']
})
export class ArtBrowseComponent implements OnInit {
  // an array of type Artist to hold the list of artists 
  artists: Observable<{ artists: Artist[] }>;
  // artists: Artist[]


  constructor(
    // the needed services to use in this component
    private albumsService: AlbumsService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.artists = this.store.select('artists')
    // this.store.select('artists').pipe(
    //   map(stateData => {
    //     return stateData.artists.map(
    //       artist => {
    //         return {
    //           ...artist, 
    //         }
    //       })
    //   })
    // )
    //   .subscribe(
    //     newArray => {
          
    //     }
    //   )
    // fetch the artists from the artists reducers in root store 
  }

  getUrl(artist: Artist){
    if (!artist.images[0]){
      return 'https://www.capefearhabitat.org/wp-content/plugins/learnpress/assets/images/no-image.png'
    } else {
      return artist.images[0].url
    }
  }

  //   let array = artistsArray[0].items;
  //   for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  //   console.log(element.images);
  //   if (element.images.length == 0) {
  //     console.log(index);
  //   }
  // }
  // const array = stateData.artists
  //       for (let index = 0; index < array.length; index++) {
  //       const element = array[index];
  //       // console.log(element.images[0]);
  //       if (!element.images[0].url) {
  //         element.images[0].url = 
  //         'https://www.capefearhabitat.org/wp-content/plugins/learnpress/assets/images/no-image.png';        
  //         // return element.images[0].url;
  //         }
  //         return element.images[0]       
  //       }
  //       // return array
  getWidth(width: number) {
    return width + '%';
    // returns a percentage to the css width property on the html element that holds 
    // the ngStyle directive
  }
  // get the artist id and name from the extracted artist element 
  getArtist(id: string, name: string) {
    // pass the id of the artist to the artistAlbum Get method of the album service and subscribe
    // to it and extract the returned Jalbum object
    this.albumsService.artistAlbums(id).subscribe(
      (albumObject: any) => {
        // check if the item array of the album object has no elements and alert the user with 
        // the proper message
        if (albumObject.items.length == 0) {
          window.alert('this artist has no albums');
        } else {
          // if the array is not empty, dispatch set album action in the root store in albums reducer
          // and pass the array to the setAlbums function al Albums Actions in the art-album store
          // and pass the name argument of getArtist function and pass it to setArtistName function
          // in the album service and then navigate to the artalbum component with the router service
          // this.albumsService.setAlbums(albumObject.items);
          this.store.dispatch(new AlbumsActions.SetAlbums(albumObject.items))
          this.albumsService.setArtistName(name);
          this.router.navigate(['/artalbum']);
        }
      },
      // if the Get method has an error then log it to the console
      error => {
        console.log(error);
      }
    );
  }
}
