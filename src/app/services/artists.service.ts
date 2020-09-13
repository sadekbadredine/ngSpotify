import { Artist } from './../shared/artist.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({providedIn:'root'})
export class ArtistsService implements OnInit{
    // same as other subjects
    artistsChanged = new Subject<Artist[]>();
    artists: Artist[] = [];

    constructor(){}

    ngOnInit(){
    }
    // retrun the array of artists
    getArtists(){   
        return this.artists;
    }
    // overwriting the array of artists and inform the subject about this change
    setArtists(artists: Artist[]){
        this.artists = artists;
        this.artistsChanged.next(this.artists);

    }
}