import React, { Component } from 'react'

export default class KswiperItem extends Component {
    render() {
        return (
            <div className='swiper-slide'>
                {this.props.children}
            </div>

        )
    }
}
