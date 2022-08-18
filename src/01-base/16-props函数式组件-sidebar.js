import React from 'react'

export default function Sidebar(props) {
    console.log(props);
    let {bg,position} = props;
    let obj={
        left:0
    }
    let obj2={
        right:0
    }
    let styleobj = {
        background:bg,
        width:'200px',
        position:"fixed"
    };
    let newobj = position === 'left' ? {...styleobj,...obj}:{...styleobj,...obj2};
  return (
    <div>
        <ul style={newobj}>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
            <li>11111111</li>
        </ul>
    </div>
  )
}
//函数组件属性默认值和验证
// Sidebar.defaultProps
// Sidebar.propTypes
