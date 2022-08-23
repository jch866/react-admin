import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
let getData = () => {
    let url = 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8444328';
    // axios({url,method,headers})
    // axios.get(url[, config])
    // axios.post(url[, data[, config]])
    return axios.get(url, {
        headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
            'X-Host': 'mall.film-ticket.cinema.list'
        }
    }).then(res => {
        // console.log(res);
        return res.data

    }).catch(error => {
        console.log(error)
    })
}
function useCinemaList(){
    let [list, setList] = useState([]);
    useEffect(() => {
        getData().then(res => {
            setList(res.data.cinemas)
        })
    }, []);
    return {
         list
    }
}
function useFilter(list,mytext){
    const getCinemalist = useMemo(() => {
        return list.filter(item => {
            return item.name.toUpperCase().includes(mytext.toUpperCase()) ||
                item.address.toUpperCase().includes(mytext.toUpperCase());
        })
    }, [list,mytext])
    return {
        getCinemalist
    }
}
export default function Cinema() {
    let [mytext, setMytext] = useState('');
    let {list} = useCinemaList();
    let {getCinemalist} =useFilter(list,mytext)
    return (
        <div>
            <input type="text" value={mytext}
                onChange={(e) => {
                    setMytext(e.target.value)
                }}
                className="cinemainput" />
            <ul className="cinemaList">
                {
                    getCinemalist.map((item, index) => {
                        return (<li key={item.cinemaId}>
                            <div className="name">{item.name}</div>
                            <div className="addr">{item.address}</div>
                        </li>)
                    })
                }
            </ul>
            {list.length === 0 && <div>暂无数据</div>}
        </div>
    )
}
//以use开头的自定义hooks useFilter useCinemaList
 