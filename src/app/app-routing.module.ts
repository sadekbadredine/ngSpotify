import { ArtAlbumComponent } from './art-album/art-album.component';
import { ArtSearchComponent } from './art-search/art-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
// routes is a constant that holds the router configuration of what component to load when the router
// detects certain path via navigate method or the router link direcitve
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'artsearch', component: ArtSearchComponent},
  {path: 'artalbum', component: ArtAlbumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
