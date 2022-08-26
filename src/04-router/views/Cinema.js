import React,{useState} from 'react'
import store from '../redux/store';
export default function Cinema(props) {
  console.log(store.getState().CityReducer);

  let [cityname,setcityname] = useState(store.getState().CityReducer.cityName);
  return (
    <div>
      <h5>Cinema</h5>
       {cityname}
      <button onClick={()=>{
        props.history.push('/city')
      }}>城市切换</button>
    </div>
  )
}
