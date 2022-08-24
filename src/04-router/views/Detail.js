import React, { useEffect,useState } from 'react'
import request from './../../request';
const {getDetail} = request;
 
export default function Detail(props) {
    console.log(props.match.params.id);
    const id = props.match.params.id;
    // console.log(props.location.query.id)
    // console.log(props.location.state.id)
    let [detailInfo,setDetail] = useState({})
    useEffect(()=>{
        getDetail(id).then(res=>{
            if(res.status ===0){
                setDetail(res.data.film);
            }
        })
    },[])
    let {name,nation,category,synopsis} = detailInfo;
  return (
    <div>
        <ul style={{padding:'10px',fontSize:'12px'}}>
            <li>{name}</li>
            <li>{nation}</li>
            <li>{category}</li>
            <li>{synopsis}</li>
        </ul>
    </div>
  )
}
