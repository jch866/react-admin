import React from "react";
import axios from "axios";
export default class Cinema extends React.Component {
    constructor() {
        super();
        this.getData();
        this.state = {
            list: [],
            mytext:''
        }
    }
    // state = {
    //     list: []
    // }
    getData() {
        let url = 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=8444328';
        // axios({url,method,headers})
        // axios.get(url[, config])
        // axios.post(url[, data[, config]])
        axios.get(url, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res => {
            // console.log(res);
            this.setState({
                list: res.data.data.cinemas,
                // bacList : res.data.data.cinemas
            })
        }).catch(error => {
            console.log(error)
        })
    }
    // searchInput = (event) => {
    //     let val = event.target.value;
    //     let { bacList } = this.state;
    //     let newList = bacList.filter(item => {
    //        return item.name.toUpperCase().includes(val.toUpperCase())||
    //         item.address.toUpperCase().includes(val.toUpperCase());
    //     })
    //     // console.log(newList)
    //     this.setState({
    //         list: newList
    //     })

    // }
    getCinemalist(){
        let val = this.state.mytext;
        return this.state.list.filter(item => {
            return item.name.toUpperCase().includes(val.toUpperCase())||
             item.address.toUpperCase().includes(val.toUpperCase());
         })
    }
    render() {
        let { list } = this.state;
        return (
            <div>
                {/* onInput 和 onChange的行为是一样的 */}
                {/* 受控组件 */}
                <input type="text" value = {this.state.mytext} 
                onChange={(e)=>{
                    this.setState({mytext:e.target.value})
                }} 
                className="cinemainput"/>
                <ul className="cinemaList">
                    {
                        this.getCinemalist().map((item, index) => {
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
}