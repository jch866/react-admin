import React, { useEffect, useState } from 'react'
// import store from '../redux/store';
import store from "../mobx/store"
import { connect } from 'react-redux'
import { show, hide } from "./../redux/actionCreater/TabbarActionCreater"
import request from './../../request';
const { getDetail } = request;

function Detail(props) {
    // const id = props.match.params.id;
    // console.log(props.location.query.id,props.location.state.id)
    const {match,hide,show} = props;//外部解构，直接把props当成依赖，会死循环；
    const id = match.params.id;
    let [detailInfo, setDetail] = useState({})
    useEffect(() => {
        console.log('详情detail create');
        hide();
        store.isTabbarShow = false;
        // store.dispatch(hide())//发布
        getDetail(id).then(res => {
            if (res.status === 0) {
                setDetail(res.data.film);
            }
        })
        return () => {
            console.log('详情detail destory');
            store.isTabbarShow = true;
            // store.dispatch(show())
            show();
        }
    }, [match.params.id,hide,show])
    let { name, nation, category, synopsis } = detailInfo;
    return (
        <div>
            <ul style={{ padding: '10px', fontSize: '12px' }}>
                <li>{name}</li>
                <li>{nation}</li>
                <li>{category}</li>
                <li>{synopsis}</li>
            </ul>
        </div>
    )
}
const mapDispatchToProps = {
    show, hide
}
export default connect(null, mapDispatchToProps)(Detail)
