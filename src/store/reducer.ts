import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../store/recommend';
import { reducer as artistsReducer } from '../store/artists'
import { reducer as RankReducer } from '../store/rank'
import { reducer as AlbumReducer } from '../store/album'

export default combineReducers ({
    recommend: recommendReducer,
    artists: artistsReducer,
    rank: RankReducer,
    album: AlbumReducer
});
