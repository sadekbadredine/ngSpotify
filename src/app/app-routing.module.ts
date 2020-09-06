import { ArtalbumComponent } from './artalbum/artalbum.component';
import { ArtsearchComponent } from './artsearch/artsearch.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'artsearch', component: ArtsearchComponent},
  {path: 'artalbum', component: ArtalbumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
