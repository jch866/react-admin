import React, { Component } from 'react'
import Swiper, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
Swiper.use([Pagination, Navigation])
export default class Kswiper extends Component {

    componentDidMount() {
        console.log(1)
       
        new Swiper(".swiper", {
            loop: this.props.loop,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination'
            }
        })
      


    }
    componentDidUpdate() {
    }
    render() {

        return (
            <div className="swiper" style={{ height: '200px', backgroundColor: 'yellow' }}>
                <div className="swiper-wrapper">
                    {this.props.children}
                </div>
                <div className="swiper-pagination"></div>
                {/*                    
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-scrollbar"></div> */}
            </div>
        )
    }
}
