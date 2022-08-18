import React from "react";
import axios from "axios";
import BScroll from "better-scroll";
export default class Cinema extends React.Component {
    constructor() {
        super();
        this.getData();
        this.state = {
            list: []
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
            this.setState({  //异步中，变成同步执行
                list: res.data.data.cinemas,
                bacList : res.data.data.cinemas
            })
            new BScroll('.wrap')
        }).catch(error => {
            console.log(error)
        })
    }
    searchInput = (event) => {
        let val = event.target.value;
        let { bacList } = this.state;
        let newList = bacList.filter(item => {
           return item.name.toUpperCase().includes(val.toUpperCase())||
            item.address.toUpperCase().includes(val.toUpperCase());
        })
        // console.log(newList)
        this.setState({
            list: newList
        })

    }
    render() {
        let { list } = this.state;
        return (
            <div>
                {/* <input type="text" onInput={(e)=>{this.searchInput(e)}} /> */}
                <input type="text" onInput={this.searchInput} className="cinemainput"/>
                <div className="wrap" style={{height:'500px',background:'yellow',overflow:'hidden'}}>
                <ul className="cinemaList">
                    {
                        list.map((item, index) => {
                            return (<li key={item.cinemaId}>
                                <div className="name">{item.name}</div>
                                <div className="addr">{item.address}</div>
                            </li>)
                        })
                    }
                </ul>
                </div>
                {list.length === 0 && <div>暂无数据</div>}
            </div>
        )
    }
}