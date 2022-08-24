import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
// BrowserRouter as Router 为了在切换路由模式时最小改动
// BrowserRouter  HashRouter
// BrowserRouter  是没有#的路径,美观,真正会向后端发请求要页面,如果后端没有路径处理,就会404
import Center from './../views/Center'
import Cinema from './../views/Cinema';
import Films from './../views/Films';
import Detail from './../views/Detail';
import Login from './../views/Login';
import NotFound from './../views/NotFound'

function isAuth(){
    return window.localStorage.getItem('token')
}
export default class IndexRouter extends Component {
    render() {
        return (
            <Router>
                {this.props.children}
                <Switch>
                    <Route path='/center' render={(props)=>{
                        // console.log(props)
                        return isAuth()?<Center {...props}/>: <Redirect to='/login' exact/>
                    }}></Route>
                    <Route path='/login' component={Login} ></Route>
                    {/* <Route path='/center' component={Center} ></Route> */}
                    <Route path='/cinema' component={Cinema} ></Route>
                    <Route path='/films' component={Films} ></Route>
                    {/* 动态路由传参 */}
                    <Route path='/detail/:id' component={Detail} ></Route>
                    {/* query state传参 不带:id*/}
                    {/* <Route path='/detail' component={Detail} ></Route> */}

                    {/* exact 将模糊匹配变成精确匹配 */}
                    <Redirect from='/' to='/films' exact/>
                    <Route component={NotFound}></Route>
                </Switch>
            </Router>
        )
    }
}
//   from='/' 万能匹配  是模糊匹配  当path为'/cinema'时也会匹配到films
// 利用Switch来解决

// class Route extends Component{
//     ...
//     render(){
//         const MyComponet = this.props.component;
//         return (
//             <div>
//                 <MyComponet history={...} match={...} location={...} />
//             </div>
//         )
//     }
// }
{/* <Route path='/center' component={Center} ></Route> */}
// this.props.component 是指Center组件，这个组件实际上是当成了Route的子组件<MyComponet/>

//当通过render来显示组件时，就需要把Route中的props手动传过去
