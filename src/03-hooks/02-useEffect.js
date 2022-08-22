import React, { useEffect, useState } from 'react'
import request from "./../02-advance/request";
const { getFilms } = request;
export default function App() {
    let [name, setName] = useState('apple');
    let [list,setList]= useState([]);
    //第一次执行，依赖更新也会执行
    useEffect(() => {
        // getFilms(1).then(res=>{setList(res.data.films)})
        setName(name.substring(0, 1).toUpperCase() + name.substring(1))
    }, [name])
    //[name]不传依赖会有警告
    
    return (
        <div>
            App-{name}
            <button onClick={() => {
                setName('xiaoming')
            }}>change</button>
        </div>

    )
}
