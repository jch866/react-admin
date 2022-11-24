import React, { Component } from 'react'
import axios from 'axios';
import './tabs受控组件通信/02-maizou.css';
const GlobalContext = React.createContext();
class FilmItem extends Component {

    render() {
        let { name, poster,grade,synopsis } = this.props;
        return (
            <GlobalContext.Consumer>
            {
                (value)=>{
                    // console.log(value);
                    return (<div className='filmitem-wrap' onClick={()=>{
                        // value.info = synopsis; 这样直接改不会引起视图更新
                        value.changeInfo(synopsis);
                     }}>
                         <img src={poster} alt={name} />
                         <div className='filmitem-con'>
                             <h5>{name}</h5>
                             <span>观众评分 {grade||0}</span>
                         </div>
                     </div>)
                }
            }
            </GlobalContext.Consumer>
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
    }
    render() {

        return (
            <GlobalContext.Consumer>
            {
                (value)=>{
                    console.log(value);
                    return (<div className='filmitem-detail'>
                    {value.info}
                 </div>)
                }
            }
            </GlobalContext.Consumer>
            
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
            // console.dir(res.data)
            this.setState({
                list: res.data.data.films
            })
        }).catch(error => {
            console.log(error)
        })
    }
    render() {
        return (
            <GlobalContext.Provider value={
                {
                   info:this.state.info,
                   changeInfo:(value)=>{//更新视图
                    this.setState({
                        info:value
                    })
                   }
                }
            }>
            <div>
                {/* {this.state.info} */}
                {
                    this.state.list.map((item) => {
                        // return <FilmItem key={filmId} name={name} poster={poster} grade={grade} />
                        return <FilmItem key={item.filmId} {...item}  />
                    })
                }
                <FilmDetail />
            </div>
            </GlobalContext.Provider>
        )
    }
}
// 利用context来完成传值  
// 1.定义const GlobalContext = React.createContext();
// 2.App变成供应商 <GlobalContext.Provider value={object}>
// 3.子组件成消费者 <GlobalContext.Consumer>   里面是一个回调函数，同时把值传进来 (value)=>{}

//Provider 里面可以提供属性也可以提供方法 
// createContext 创建多个
// const firstContext = createContext(); //firstContext自定义名称
// const secondContext = createContext(); //secondContext自定义名称

//自定义的context
//contextType 可以简化 context 的使用，不使用 consumer 也可以共享变量
//申明静态变量、contextType 将 context 直接赋值于 contextType
//static contextType = ThemeContext