import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    function loginHandle(){
        localStorage.setItem('token','abc');
        navigate('/center')
    }
  return (
    <>
     <div>Login</div>
    user:<input type="text" />
    password:<input type="password" />
    <button onClick={()=>{
        loginHandle()
    }}>login</button>
    </>
   
  )
}
