import { Action } from '@ngrx/store'
import { Album } from '../../shared/album.model'

export const SET_ALBUMS = 'SET_ALBUMS'

export class SetAlbums implements Action {
    readonly type = SET_ALBUMS;
    constructor(public payload: Album[]){}
}
