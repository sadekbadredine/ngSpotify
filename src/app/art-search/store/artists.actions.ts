import { Action } from '@ngrx/store'
import { Artist } from '../../shared/artist.model'

export const SET_ARTISTS = 'SET_ARTISTS'

export class SetArtists implements Action{
    // since action is an object so it can be created based on classes which implements Action interface that foces 
    // us to structure the class in way to have a type that is the identifier of the action
    // readonly is a typescript feature that this property must never be changed from outside
    readonly type = SET_ARTISTS;
    // and this action needs the artists to be added as a payload 
    constructor(public payload : Artist[]){}
}