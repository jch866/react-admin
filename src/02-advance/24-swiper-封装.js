import React, { Component } from 'react'
import Kswiper from './23-swiper';
import KswiperItem from './23-swiper-item';
import request from "./request";
const { getFilms } = request; //真实数据请求
export default class App extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        console.log(2)
        getFilms(1).then(res => {
            this.setState({
                list: res.data.films.slice(0,3)
            })
        })
    }
    render() {
        //异步循环出来的KswiperItem 显示？
        return (
            <div>
                <Kswiper loop={true}>
                    {/* <KswiperItem  >123</KswiperItem>
                <KswiperItem  >1233</KswiperItem>
                <KswiperItem  >1243</KswiperItem> */}
                    {
                        this.state.list.map((item) => {
                            return (<KswiperItem key={item.filmId}>
                                <img style={{height: '200px',width:'100%'}} src={item.poster} alt={item.name} />
                            </KswiperItem>)
                        })
                    }
                </Kswiper>
            </div>
        )
    }
}
