import React, { useEffect, useState, useMemo } from 'react'
import store from '../redux/store';
import { cinemachange } from '../redux/actionCreater/CinemaActionCreate';
export default function Cinema(props) {
    // console.log(store.getState().CityReducer);
    let [list, setlist] = useState(store.getState().CinemaListReducer.list);
    let [mytext, setMytext] = useState('');
    useEffect(() => {
        let list = store.getState().CinemaListReducer.list;
        if (list.length === 0) {
            //发布
            store.dispatch(cinemachange())
        } else {
            //console.log('store 缓存')
        }
        //订阅
        let unsubscribe = store.subscribe(() => {
           //console.log('cinema subscribe');
            setlist(store.getState().CinemaListReducer.list)
        })
        return () => {
            unsubscribe()
        }
    }, []);
    const getCinemalist = useMemo(() => {
        return list.filter(item => {
            return item.name.toUpperCase().includes(mytext.toUpperCase()) ||
                item.address.toUpperCase().includes(mytext.toUpperCase());
        })
    }, [list, mytext])
    return (
        <div>
            <button
                onClick={() => {
                    props.history.goBack();
                }}>返回</button>
            <input type="text" onInput={(e) => { setMytext(e.target.value) }} value={mytext} />
            <ul className="cinemaList">
                {
                    getCinemalist.map(item => {
                        return (<li key={item.cinemaId}>
                            <div className="name">{item.name}</div>
                            <div className="addr">{item.address}</div>
                        </li>)
                    })
                }
            </ul>
            {getCinemalist.length === 0 && <div>暂无数据</div>}
        </div>
    )
}
