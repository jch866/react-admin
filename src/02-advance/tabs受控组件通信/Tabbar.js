/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'
import './02-maizou.css';

// export default class Tabbar extends Component {
//     state = {
//         list: [{
//             id: 1,
//             text: '电影'
//         }, {
//             id: 2,
//             text: '影院'
//         }, {
//             id: 3,
//             text: '个人中心'
//         }]
//     }
//     render() {
//         let { list } = this.state;
//         return (
//             <ul className='bottom-tab'>
//                 {
//                     list.map((item, index) => {
//                         return (<li key={item.id} className={this.props.p_current === index ? 'active' : ''}
//                             onClick={() => { this.tabChange(index) }}>{item.text}</li>)
//                     })
//                 }
//             </ul>
//         )
//     }
//     tabChange(index) {
//         this.props.myevent(index)
//     }
// }
//函数式组件 依赖父级属性传值，写起来更简洁了
const Tabbar = (props)=>{
    // tabChange(index) {
    //     this.props.myevent(index)
    // }
    return (<ul className='bottom-tab'>
    {
        props.list.map((item, index) => {
            return (<li key={item.id} className={props.p_current === index ? 'active' : ''}
                onClick={() => { props.myevent(index) }}>{item.text}</li>)
        })
    }
</ul>)
}
export default Tabbar;

