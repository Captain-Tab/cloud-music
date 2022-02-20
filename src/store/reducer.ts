import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../store/recommend';

export default combineReducers ({
    recommend: recommendReducer,
});
