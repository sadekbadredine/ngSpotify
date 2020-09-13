import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ArtBrowseComponent } from './art-browse/art-browse.component';
import { ArtSearchComponent } from './art-search/art-search.component';
import { ArtAlbumComponent } from './art-album/art-album.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ArtBrowseComponent,
    ArtSearchComponent,
    ArtAlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromApp.appRducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
