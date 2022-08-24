import React from 'react'

export default function Login(props) {
    const loginHandle = ()=>{
        window.localStorage.setItem('token','abc-text');
        props.history.push('/center')
    }
    const loginoutHandle = ()=>{
        window.localStorage.clear();
    }
    return (
        <div>
            <h5>Login</h5>
            <input type="text" />
            <button onClick={() => {
                loginHandle();
            }}>登录</button>
            <button onClick={() => {
                loginoutHandle();
            }}>退出</button>
        </div>
    )
}
