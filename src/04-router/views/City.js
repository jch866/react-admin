import React ,{useState} from 'react'
// import store from '../redux/store';
import {connect} from "react-redux"
import { citychange } from '../redux/actionCreater/CityActionCreate';
 function City(props) {
    let initlist = ['北京','上海','广州','深圳'];
    let [list,setList] = useState(initlist)
  return (
    <div>
        <h5>城市列表</h5>
        {
         list.map((item,index)=><li key={index} onClick={()=>{
            // store.dispatch(citychange(item));
            props.citychange(item)
            props.history.goBack()
         }}>{item}</li>)
        }
    </div>
  )
}
const mapDispatchToProps = {
  citychange
}
export default connect(null,mapDispatchToProps)(City)