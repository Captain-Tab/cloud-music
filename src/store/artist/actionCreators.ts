import { CHANGE_SONGS_OF_ARTIST, CHANGE_ARTIST, CHANGE_ENTER_LOADING } from './constants';
import { fromJS } from 'immutable';
import { fetchArtistDetail } from '../../fetch';

const changeArtist = (data: any) => ({
  type: CHANGE_ARTIST,
  data: fromJS(data)
})

const changeSongs = (data: any) => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
})

export const changeEnterLoading = (data: any) => ({
  type: CHANGE_ENTER_LOADING,
  data
})

export const getArtistInfo = (id: string) => {
  return (dispatch: any) => {
    fetchArtistDetail(id).then((data: any) => {
      dispatch(changeArtist(data.artist));
      dispatch(changeSongs(data.hotSongs));
      dispatch(changeEnterLoading(false));
    })
  }
}