import React from 'react'
import { withRouter } from 'react-router'
import './../css/index.css'
function Center(props) {
  console.log(props) // 父级不传就是 {}空对象
  return (
    <div>
      <h4>个人中心</h4>
      <ul className='playing-tab'>
        <li onClick={() => {
          props.history.push('/filmsorder')
        }}>
          电影订单
        </li>
        <li>
          其它信息
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Center);
// 当 通过render来显示组件时，就需要把Route中的props手动传过去 才可以调用props.history中的 方法

// withRouter包装以后就不用依赖 父级route的props