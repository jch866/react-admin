import React from 'react'
import { useNavigate } from 'react-router-dom';
// import WithRouter from './WithRouter';
function FilmItem(item) {
    const navigate = useNavigate();//hooks 跳转路由
    return (
        <li onClick={() => {
            //v6版本函数组件中 navigate跳转
            navigate(`/detail/${item.filmId}`)
        }}>{item.name}</li>
    )
}

// v6中已经没有withRouter 在写class组件时要自己封装一个withRouter

class FilmItem1 extends React.Component {
    // this.props.history.push
    render() {
        return <li onClick={() => {
          this.handerclick(this.props.filmId)
        }}>{this.props.name}</li>
    }
    handerclick(id){
        console.log(id);
        this.props.history.push(`/detail/${this.props.filmId}`)
    }
}



// export default WithRouter(FilmItem)
export default  FilmItem
