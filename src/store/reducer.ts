import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../store/recommend';
import { reducer as artistsReducer } from '../store/artists'


export default combineReducers ({
    recommend: recommendReducer,
    artists: artistsReducer
});
