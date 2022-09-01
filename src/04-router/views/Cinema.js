import React, { useEffect, useState } from 'react'
// import store from '../redux/store';
import { connect } from "react-redux"
import { cinemachange } from '../redux/actionCreater/CinemaActionCreate';
import { Button, Space,DotLoading,SpinLoading,NavBar,Toast } from "antd-mobile"
import { SearchOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons'

function Cinema(props) {

  // let [list, setlist] = useState(store.getState().CinemaListReducer.list);
  let { list, cityname, cinemachange } = props;
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
  }, [list, cityname, cinemachange]);
  const right = (
    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline onClick={() => {
          props.history.push('/cinema/search')}}/>
      </Space>
    </div>
  )

  const back = () =>props.history.goBack()
    // Toast.show({
    //   content: '点击了返回区域',
    //   duration: 1000,
    // })
  // let [cityname, setcityname] = useState(store.getState().CityReducer.cityName);
  const leftCon = (<div onClick={() => {
      props.history.push('/city')}}>
      {cityname}
    </div>)
  return (
    <div>

      <NavBar left={leftCon} right={right} onBack={back}>
            影院
      </NavBar>
      {/* <Space>
        <Button color='primary' size='mini' fill='solid' onClick={() => {
          props.history.push('/city')
        }}>
          城市切换
        </Button>
        <Button color='primary' size='mini' fill='solid' onClick={() => {
          props.history.push('/cinema/search')
        }}>
          搜索
        </Button>
      </Space> */}
      
      <ul className="cinemaList">
        {
          list.map(item => {
            return (<li key={item.cinemaId}>
              <div className="name">{item.name}</div>
              <div className="addr">{item.address}</div>
            </li>)
          })
        }
        {list.length === 0 && <SpinLoading color='primary' />}
      </ul>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    list: state.CinemaListReducer.list,
    cityname: state.CityReducer.cityname
  }
}
const mapDispatchToProps = {
  cinemachange
};
export default connect(mapStateToProps, mapDispatchToProps)(Cinema) 