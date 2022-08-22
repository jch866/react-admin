import React, { useEffect, useState, Component } from 'react'
import request from "../02-advance/request";
const { getFilms } = request;
//函数式组件 
function FilmList(props) {
    let [list, setList] = useState([]);
    useEffect(() => {
        getFilms(props.type).then(res => {
            setList(res.data.films)
        })
    }, [props.type])
    return (
        <div>
            {
                list.map((item) => {
                    return <li key={item.filmId}>{item.name}</li>
                })
            }
        </div>
    )
}
//类组件
// class FilmListClass extends Component {
//     state = {
//         list: []
//     }
//     getData(type) {
//         let dataFn = type === 1 ? getFilms(1) : getFilms(2);
//         dataFn.then(res => {
//             this.setState({
//                 list: res.data.films
//             })
//         })
//     }
//     componentDidMount() { //只在创建时执行 点击切换时不执行了
//         this.getData(this.props.type)
//     }
//     UNSAFE_componentWillReceiveProps(nextProps) { //状态更改时执行  一般会频繁触发
//         this.getData(nextProps.type)
//         // console.log(nextProps.type);
//         // nextProps.type === 1 ? getFilms(1) : getFilms(2);
//     }
//     render() {
//         return (
//             <div>
//                 {this.props.type}
//                 {
//                     this.state.list.map((item) => {
//                         return <li key={item.filmId}>{item.name}</li>
//                     })
//                 }
//             </div>
//         )
//     }
// }
export default class App extends Component {
    state = {
        type: 1
    }
    render() {
        return (
            <div>
                <ul>
                    <li onClick={() => {
                        this.setState({
                            type: 1
                        })
                    }}>正在上映</li>
                    <li onClick={() => {
                        this.setState({
                            type: 2
                        })
                    }}>即将上映</li>
                </ul>
                <FilmList type={this.state.type} />
            </div>
        )
    }
}