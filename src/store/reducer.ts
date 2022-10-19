import { combineReducers } from 'redux-immutable';
import { reducer as RecommendReducer } from '../store/recommend';
import { reducer as ArtistsReducer } from '../store/artists'
import { reducer as RankReducer } from '../store/rank'
import { reducer as AlbumReducer } from '../store/album'
import { reducer as ArtistReducer } from '../store/artist'
import { reducer as PlayerReducer } from '../store/player'
import { reducer as SearchReducer } from '../store/search'


export default combineReducers ({
    recommend: RecommendReducer,
    artists: ArtistsReducer,
    artist: ArtistReducer,
    rank: RankReducer,
    album: AlbumReducer,
    player: PlayerReducer,
    search: SearchReducer
});
