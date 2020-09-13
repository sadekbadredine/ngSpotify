import { Album } from '../../shared/album.model'
import * as albumsActions from './albums.actions'

export interface State{
    albums: Album[]
}

const initialState: State = {
    albums:[]
}

export function ablumsReducer(
    state: State = initialState, 
    action: albumsActions.SetAlbums
    ){
    switch (action.type) {
        case albumsActions.SET_ALBUMS:
            return {
                ...state,
                albums:[...action.payload]
            }
    
        default:
            return state;
    }
}