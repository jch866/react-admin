import React, { useEffect, useState } from 'react'
import "./../css/index.css"
import request from "./../../request";
const { getComingsoon } = request;
export default function Comingsoon() {
  let [list,setList] = useState([])
  useEffect(()=>{
    getComingsoon().then(res=>{
       //bak_coming.json 猫眼即将上映数据
       if(res.success){
        setList(res.coming)
       }
    })
  },[])
  
  return (
    <div>
      <ul className='comingsoon'>
        {
          list.map(item=>{
            let {nm,star,showInfo,id} = item;
            return (<li key={id} >
              {nm} -- {star}-{showInfo}
            </li>)
          })
        }
      </ul>
    </div>
  )
}
