import { CHANGE_LOADING, CHANGE_RANK_LIST } from "./constants";
import { fromJS } from "immutable";
import { fetchRankList } from "../../fetch";

const changeRankList = (data: any) => ({
    type: CHANGE_RANK_LIST,
    data: fromJS(data)
})

const changeLoading = (data: any) => ({
    type: CHANGE_LOADING,
    data
})

export const getRanklist = () => {
    return (dispatch: any) => {
      fetchRankList<any>().then((res) => {
          const { list } = res
          dispatch(changeRankList(list))
          dispatch(changeLoading(false))
      })
    }
}
