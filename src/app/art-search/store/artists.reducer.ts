import { Artist } from 'src/app/shared/artist.model';
import * as artistsActions from './artists.actions'

export interface State{
    artists: Artist[]
}

// the initialState
const initialState: State = {
    artists:[]
};
// the reducer function which takes state of initialState to be modified and the action to be dispatched, as arguments 
// the type of the action and the value of the type are imported from the actions file
// the action is of type setArtists class of the artists actions which impplements the Actions interface that 
// forces any action to have a type property 
// they could be defined here in this file but it's for a safer typo 
export function artistsReducer(
    state: State = initialState, 
    action: artistsActions.SetArtists
    ){
     // type is the idnetifier of the action 
    switch (action.type) {
        // artistsActions.SET_ARTISTS is th evalue of the identifier
        // the normal flow is cas 'SET_ARTISTS', so if we dispatch this action from anywhere in the app, and especially
        // if it's a big app, it's easy to forget a character and have a typo, adn ngRx pushes us to use a better pattern
        // fro creating and adding actions, where we create a separate folder to standarize actions and payloads
        case artistsActions.SET_ARTISTS:
            return {
               ...state,
               // it pulls out all the properties of the old state and add these properties to the new object we return 
                artists:[...action.payload]
                // here wer overwrite the artists array 
                // ... on an array, pull out all the elements and add them to the this array here => artists
            }
            default:
                return state;
    }
}