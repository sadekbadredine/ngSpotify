import * as fromArtists from '../art-search/store/artists.reducer'
import * as fromAlbums from '../art-album/store/albums.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
    artists: fromArtists.State,
    albums: fromAlbums.State
}

export const appRducer: ActionReducerMap<AppState> = {
    artists: fromArtists.artistsReducer,
    albums: fromAlbums.ablumsReducer
};