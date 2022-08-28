import React, { useEffect, useState } from 'react'
// import store from '../redux/store';
import {connect} from "react-redux"
import { cinemachange } from '../redux/actionCreater/CinemaActionCreate';
function Cinema(props) {

  // let [list, setlist] = useState(store.getState().CinemaListReducer.list);
  let {list,cityname,cinemachange} = props;
  useEffect(() => {
    // let list = store.getState().CinemaListReducer.list;
    if (list.length === 0) {
      //发布
      //store.dispatch(cinemachange())
      cinemachange()
    } 
    // else {
    //   console.log('store 缓存')
    // }
    // //订阅
    // let unsubscribe = store.subscribe(() => {
    //   console.log('cinema subscribe');
    //   setlist(store.getState().CinemaListReducer.list)
    // })
    // return () => {
    //   // 取消当前订阅 优化性能
    //   unsubscribe()
    // }
  }, [list,cityname,cinemachange]);

  // let [cityname, setcityname] = useState(store.getState().CityReducer.cityName);
  return (
    <div>
      Cinema - {cityname}
      <button onClick={() => {
        props.history.push('/city')
      }}>城市切换</button>
      <button onClick={() => {
        props.history.push('/cinema/search')
      }}>搜索</button>
      <ul className="cinemaList">
        {
          list.map(item => {
            return (<li key={item.cinemaId}>
              <div className="name">{item.name}</div>
              <div className="addr">{item.address}</div>
            </li>)
          })
        }
      </ul>
    </div>
  )
}
const mapStateToProps = (state)=>{
  return {
    list:state.CinemaListReducer.list,
    cityname:state.CityReducer.cityname
  }
}
const mapDispatchToProps = {
  cinemachange
};
export default connect(mapStateToProps,mapDispatchToProps)(Cinema) 