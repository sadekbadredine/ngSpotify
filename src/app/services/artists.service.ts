import { Artist } from './../shared/artist.model';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({providedIn:'root'})
export class ArtistsService implements OnInit{
    artistsChanged = new Subject<Artist[]>();
    artists: Artist[] = [];

    constructor(){}

    ngOnInit(){
    }
    
    getArtists(){
        return this.artists;
    }

    setArtists(artists: Artist[]){
        this.artists = artists;
        this.artistsChanged.next(this.artists);

    }
}