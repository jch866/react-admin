import React from 'react'
import { connect } from 'react-redux'

const App = function(props) {
  console.log(props)
  const {dispatch} = props;
  const handletakeEvery = () => {
    dispatch({type:'takeEvery'});
    // console.log('saga takeEvery')
  }
  const handletakeLatest = () => {
    console.log('saga takeLatest')
  }
  const handlethrottle = () => {
    console.log('saga throttle')
  }
  return (
    <>
      <div>App</div>
      <button onClick={()=>{handletakeEvery()}}>发送takeEvery</button>
      <button onClick={handletakeLatest}>发送takeLatest</button>
      <button onClick={handlethrottle}>发送throttle</button>
    </>

  )
}

export default connect()(App)
