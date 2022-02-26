import React, {useEffect} from "react";
import { connect } from 'react-redux';
import { getRanklist} from "../../store/rank/actionCreators";

const Rank = (props: any) : JSX.Element => {
    const { rankList:list, loading } = props;
    const { getRankListDataDt } = props;
    const rankList = list ? list.toJS () : [];

    useEffect(()=> {
        getRankListDataDt()
    }, [])
    return <div>Rank</div>
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
    rankList: state.getIn (['rank', 'rankList']),
    loading: state.getIn (['rank', 'loading']),
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
    return {
        getRankListDataDt () {
            dispatch (getRanklist());
        }
    }
};

export default connect (mapStateToProps, mapDispatchToProps)(React.memo (Rank));
