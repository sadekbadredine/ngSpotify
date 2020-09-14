import { map } from 'rxjs/operators';
import { SearchService } from '../services/search.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Artist } from '../shared/artist.model';
import { Store } from '@ngrx/store';
import * as ArtistsActions from './store/artists.actions'
import * as fromApp from '../store/app.reducer'


@Component({
  selector: 'app-artsearch',
  templateUrl: './art-search.component.html',
  styleUrls: ['./art-search.component.css']
})
export class ArtSearchComponent implements OnInit {
  // search property holds the form input content
  search : string;
  // searchFrom property holds the created from object of type FormGroup 
  searchForm: FormGroup;
  // resultStyle property holds the css property of the directive that has ngStyle on it 
  resultStyle: string;
  // reltSuccess property holds a boolean value to show art-browse component when it is true
  resultSuccess: boolean = false; 

  constructor(
    // the neeed servies in the class
    private searchService: SearchService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    // getstr holds the value of str item that is stored in localstorage with getItem funciton 
    let getstr = localStorage.getItem('str')
    // new FormGroup creates a FormGroup instance 
    this.searchForm = new FormGroup({
      // 'search' is the registered name of the FormControl that is synchronized with the 
      // formControlName property in the input element 
      'search': new FormControl()
    })
    // if getstr property has a value then pass this value to the handleSearch function 
    if (getstr) {
      this.handleSearch(getstr);
    }
    
  }
  // onSubmit function assigns the value of the search property to the str item in the local storage 
  // with setItem function
  // then pass the value of the search property to handSearch function
  onSubmit(){
    localStorage.setItem('str',this.search)
    this.handleSearch(this.search)
  }
  // handleSearch function gets a str as parameter of type string which is the searched keyword
  handleSearch(str: string){
    // pass the str parameter to searchArtist method of the search service 
    this.searchService.searchArtist(str).pipe(
      // pipe rxjs operator is to chain one or many operators together before they reach the subscrive method
      // map rxjs operator is to transform the returned data from the observable and return new data
      map(resData=>{
        // resData is a function where we want to return an array of artists
        const artistsArray = [];
        // create a constant array 
        for (const key in resData) {
          // loop through all the keys in the resData object
          if (resData.hasOwnProperty(key)){
            // check if resData has key as its own property so that we're not trying to access the property of a
            // prototype
            artistsArray.push({...resData[key], id: key});
            // then push each key of data to the artistArray with resDta[key], here we're accessing 
            // the key we're looping at in resData, which is the nested JS object, and push that nested
            // JS object to the array, we wrap it in a curly braces to push a new object, and then we use
            // the spread operator ... three dots before resData[key], this will pull out all the key value
            // pairs of that nested object we're accessing here, and this allows to add one new key valye pair
            // to that object we're adding to artistsArray, and that should be an id field which stores the key
            // to maybe delete that artists array usign that key
          }
        }
        // then we access the first element of the new array we have which has items array by default on it 
        // by spotify returned JSON object , then we return tha items array to wrap the observable wiht it and
        // subscribe to it later
        return artistsArray[0].items;
      })
    ).subscribe(
      (artists:Artist[])=>{
        // here we subscribe to the array we got from the observable earlier, and we pass it to the 
        // SetArtists function to dispatch the action of setting an artist
        // here we wanna create a new object based on the action class and dispatch it
        this.store.dispatch(
          new ArtistsActions.SetArtists(artists)
        )
        // then we set the resultSuccess to true to show the art-browse component
        this.resultSuccess = true;
        // then we change the input style to be above the art-browse component
        this.resultStyle = '15%';       
      },
      error=>{
        console.log(error);
      }
    );
  }
  // searchArtist function checks if we search porperty has values and then executes onSumit method
  searchArtist() {
    if (this.search) {
      this.onSubmit();
    }else{
      // if it is null, the style of the input element stays in the center of the page 
      this.resultStyle = '50%';
      // and the art-broswe component stays hidden
      this.resultSuccess = false;
    }
  }

}
