import { ArtistsService } from '../services/artists.service';
import { map } from 'rxjs/operators';
import { SearchService } from './../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Artist } from '../shared/artist.model';

@Component({
  selector: 'app-artsearch',
  templateUrl: './artsearch.component.html',
  styleUrls: ['./artsearch.component.css']
})
export class ArtsearchComponent implements OnInit {
  search : string;
  searchForm: FormGroup;
  resultStyle: string;
  resultSuccess: boolean = false;
  

  constructor(
    private searchService: SearchService,
    private artistsService: ArtistsService
    ) { }

  ngOnInit(): void {
    let getstr = localStorage.getItem('str')
    this.searchForm = new FormGroup({
      'search': new FormControl()
    })
    if (getstr) {
      this.handleSearch(getstr);
    }
  }


  onSubmit(){
    localStorage.setItem('str',this.search)
    this.handleSearch(this.search)
  }

  private handleSearch(str: string){
    this.searchService.searchArtist(str).pipe(
      map(resData=>{
        const artistsArray = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)){
            artistsArray.push({...resData[key], id: key});
          }
        }
        return artistsArray[0].items;
      })
    ).subscribe(
      (artists:Artist[])=>{
        this.artistsService.setArtists(artists);
        this.resultSuccess = true;
        this.resultStyle = '15%';       
      },
      error=>{
        console.log(error);
      }
    );
  }

  searchArtist() {
    if (this.search) {
      this.onSubmit();
    }else{
      this.resultStyle = '50%';
      this.resultSuccess = false;
    }
  }

}
