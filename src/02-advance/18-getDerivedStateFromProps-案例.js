import { resetWarningCache } from 'prop-types';
import React, { Component } from 'react'
import request from "./request";
const { getFilms } = request;
class FilmList extends Component {
    state = {
        list: [],
        type:1
    }
    getData(type){
        let dataFn = type ===1 ? getFilms(1):getFilms(2);
        dataFn.then(res=>{
            this.setState({
                list:res.data.films
            })
        })
    }
    componentDidMount() { //只在创建时执行 点击切换时不执行了
        this.getData(this.props.type)
    }
    static getDerivedStateFromProps(nextProps,nextState){
        console.log('getDerivedStateFromProps',nextProps)
        //没有this当然也不能this.setState操作
        return {
            type:nextProps.type
        }
    }
    componentDidUpdate(prevProps,prevState){
        console.log('this.state.type',this.state.type);
        if(this.state.type === prevProps.type){ //新老状态相比，避免死循环
            return 
        }
        let dataFn = this.state.type ===1 ? getFilms(1):getFilms(2);
        dataFn.then(res=>{ //list更新会触发getDerivedStateFromProps 从而造成死循环
            this.setState({
                list:res.data.films
            })
        })
    }
    // UNSAFE_componentWillReceiveProps(nextProps) { //切换时执行
    //     this.getData(nextProps.type)
    //     // console.log(nextProps.type);
    //     // nextProps.type === 1 ? getFilms(1) : getFilms(2);
    // }
    render() {
        return (
            <div>
                {this.props.type}
                {
                    this.state.list.map((item) => {
                        return <li key={item.filmId}>{item.name}</li>
                    })
                }
            </div>
        )
    }
}
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
//getDerivedStateFromProps 新生命周期   
// UNSAFE_componentWillReceiveProps  老生命周期    新老不共存
// getDerivedStateFromProps  代替了componentWillMount(初始化) componentWillReceiveProps(父传子)略显麻烦，但性能有所提升 
//搭配componentDidMount(第一次请求数据)，componentDidUpdate，利用最新的state 来做业务
