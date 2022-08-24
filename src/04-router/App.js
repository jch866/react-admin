import React, { Component } from 'react'
import Tabbar from './components/Tabbar'
import Mrouter from './router/index'
export default class App extends Component {
  render() {
    return (
      <div>
        <Mrouter>
          <Tabbar></Tabbar>
        </Mrouter>
        
        {/* You should not use <NavLink> outside a <Router></Router> */}
      </div>
    )
  }
}
