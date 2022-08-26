import React, { useEffect, useState } from 'react'
import store from '../redux/store';
import { cinemachange } from '../redux/actionCreater/CinemaActionCreate';
export default function Cinema(props) {
  // console.log(store.getState().CityReducer);
  let [list, setlist] = useState(store.getState().CinemaListReducer.list);

  useEffect(() => {
    let list = store.getState().CinemaListReducer.list;
    if (list.length === 0) {
      //发布
      store.dispatch(cinemachange())
    } else {
      console.log('store 缓存')
    }
    //订阅
    store.subscribe(() => {
      console.log('cinema subscribe');
      setlist(store.getState().CinemaListReducer.list)
    })
  }, []);

  let [cityname, setcityname] = useState(store.getState().CityReducer.cityName);
  return (
    <div>
      <h5>Cinema</h5>
      {cityname}
      <button onClick={() => {
        props.history.push('/city')
      }}>城市切换</button>
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
