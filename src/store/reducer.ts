import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../store/recommend';
import { reducer as artistsReducer } from '../store/artists'
import { reducer as RankReducer } from '../store/rank'
import { reducer as AlbumReducer } from '../store/album'
import { reducer as artistReducer } from '../store/artist'

export default combineReducers ({
    recommend: recommendReducer,
    artists: artistsReducer,
    artist: artistReducer,
    rank: RankReducer,
    album: AlbumReducer
});
