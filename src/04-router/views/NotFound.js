import React, { useEffect } from 'react'

function NotFound(props) {
  useEffect(()=>{
    console.log(props)
  },[])
  return (
    <div>404 Not Found</div>
  )
}
const myConnect = (mapState,mapDispatch)=>{
  let value = mapState();
  return (Component)=>{
    return (props)=>( // props是组件自身的属性传过来的
      <div style={{background:'red'}}>
        <Component {...value} {...mapDispatch} {...props}/>
      </div>
    )
  }
}
const mapStateToProps = ()=>{
  return {
    a:1,
    b:2
  }
}
const mapDispatchToProps ={
  aa:()=>{
    return {
      type:'change-test'
    }
  }
}
export default myConnect(mapStateToProps,mapDispatchToProps)(NotFound)