import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import Center from './../views/Center'
import Cinema from './../views/Cinema';
import Films from './../views/Films';
import NotFound from './../views/NotFound'

export default class IndexRouter extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/center' component={Center} ></Route>
                    <Route path='/cinema' component={Cinema} ></Route>
                    <Route path='/films' component={Films} ></Route>
                    {/* exact 将模糊匹配变成精确匹配 */}
                    <Redirect from='/' to='/films' exact/>
                    <Route component={NotFound}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
//   from='/' 万能匹配  是模糊匹配  当path为'/cinema'时也会匹配到films
// 利用Switch来解决
