import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function Detail() {
    const navigate = useNavigate();
    // query传参 detail?id=xx
    // const [searchParams,setSearchParams] = useSearchParams();
    // console.log(searchParams.get('id'));

    // 路由传参  detail/id
    const params = useParams();
    console.log(params.id)
  return (
    <>
    <div>Detail</div>
    <button onClick={()=>{
        // query传参 detail?id=xx
        // setSearchParams({id:1000})
        // 路由传参  detail/id
        navigate('/detail/1000')
    }}>猜你喜欢</button>
    </>
    
  )
}
