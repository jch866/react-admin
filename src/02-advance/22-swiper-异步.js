import React, { Component } from 'react'
import Swiper, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Pagination, Navigation])
export default class App extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                list: ['111', '222', '333']
            })
            new Swiper(".swiper", {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        }, 1000)

        
    }
    componentDidUpdate(){
        // new Swiper(".swiper", {
        //     loop: true,
        //     pagination: {
        //         el: '.swiper-pagination'
        //     }
        // })
    }
    render() {
        let { list } = this.state;
        return (
            <div>
                <div className="swiper" style={{ height: '200px', backgroundColor: 'yellow' }}>
                    <div className="swiper-wrapper">
                        {
                            list.map((item, index) => {
                                return (
                                    <div className="swiper-slide" key={index}>{item}</div>
                                )
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                    {/*                    
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-scrollbar"></div> */}
                </div>
            </div>
        )
    }
}
