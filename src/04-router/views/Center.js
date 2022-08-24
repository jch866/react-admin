import React from 'react'
import './../css/index.css'
export default function Center(props) {
  console.log(props) // 父级不传就是 {}空对象
  return (
    <div>
      Center
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
// 当 通过render来显示组件时，就需要把Route中的props手动传过去 才可以调用props.history中的 方法