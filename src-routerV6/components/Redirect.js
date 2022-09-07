import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Redirect({to}) {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(to,{replace:true})
    },[])
  return null
}

// 1. Navigate重定向
// 2.自定义 Redirect  重定向