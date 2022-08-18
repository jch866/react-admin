import React, { Component } from 'react'
import axios from 'axios';
import './tabs受控组件通信/02-maizou.css';
const bus = {
    callbacks: [],
    publish(v) {
      this.callbacks.forEach(item => {
        item && item(v);
      })
    },
    subscribe(cb) {
      this.callbacks.push(cb)
    }
  }
class FilmItem extends Component {

    render() {
        let { name, poster,grade,synopsis } = this.props;
        return (
            <div className='filmitem-wrap' onClick={()=>{
                // this.props.onEvent(synopsis);
                bus.publish(synopsis)//发布
            }}>
                <img src={poster} alt={name} />
                <div className='filmitem-con'>
                    <h5>{name}</h5>
                    <span>观众评分 {grade||0}</span>
                </div>
            </div>
        )
        // {synopsis} 详情
    }
}
class FilmDetail extends Component {
    constructor(){
        super();
        this.state = {
            info:''
        }
        bus.subscribe((v)=>{
            // console.log('订阅者',v); //接收数据
            this.setState({
                info:v
            })
        })
    }
   
    render() {
        // let { name, poster,grade,synopsis } = this.props;
        return (
            <div className='filmitem-detail'>
                {this.state.info}
            </div>
        )
    }
}
export default class App extends Component {
    constructor() {
        super();
        this.getData();
        this.state = {
            list: [],
            info:''
        }
    }
    getData() {
        let url = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=641705';
        axios.get(url, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            console.log(res)
            this.setState({
                list: res.data.data.films
            })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <div>
                {/* {this.state.info} */}
                {
                    this.state.list.map((item) => {
                        // return <FilmItem key={filmId} name={name} poster={poster} grade={grade} />
                        return <FilmItem key={item.filmId} {...item} onEvent={(synopsis)=>{
                            this.setState({
                                info:synopsis
                            })
                        }}/>
                    })
                }
                <FilmDetail detail={this.state.info}/>
            </div>
        )
    }
}
//中间人模式 发布订阅模式改造

