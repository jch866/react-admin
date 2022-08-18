/*
 * @作者: kerwin
 * @公众号: 大前端私房菜
 */
import React, { Component } from 'react'

export default class App extends Component {

    state = {
        list: []
    }
    inputText = React.createRef();

    render() {
        let { list } = this.state;
        // var newlist = this.state.list.map(item=><li>{item}</li>)
        return (
            <div>
                <input type="text" ref={this.inputText} />
                <button onClick={() => { this.addHandler() }}>添加</button>
                {
                    list.length > 0 ? <ul>
                        {
                            // this.state.list.map((item, index) => (<li key={item.id}>{item.value}</li>))
                            list.map((item, index) => (this.showLi(item, index)))
                        }
                    </ul>
                        : <div>暂无数据</div>
                }
                {/* {list.length === 0 && <div>暂无数据</div>} */}
                {/* <div className = {list.length === 0 ? 'hidden':''}>暂无数据</div> */}
            </div>
        )
    }
    showLi({ id, value }, index) {
        return <li key={id}>
            {/* {value} */}
            {/* 富文本内容显示 */}
            <span dangerouslySetInnerHTML={{
                    __html: value
                }}></span>
            <button onClick={() => { this.delItem(index) }}>删除</button>
        </li>
    }
    delItem(index) {
        let { list } = this.state;
        let newlist = [...list];
        newlist.splice(index, 1);
        this.setState({
            list: newlist
        })
    }
    delItem2(id) {
        let { list } = this.state;
        let index = list.findIndex(i => i.id === id);
        let newlist = [...list]; //不影响原数据
        newlist.splice(index, 1);
        this.setState({
            list: newlist
        })
    }
    addHandler() {
        let value = this.inputText.current.value;
        if (!value) return;
        // let id = Number.parseInt(Math.random() * 10000);
        let id = Math.random().toString(36).slice(-9).toUpperCase();
        //不要直接修改状态，可能会有不可预期的影响
        // this.state.list.push({ id, value })
        let newList = this.state.list.slice(); // 1.slice()   2.[...list]
        newList.push({ id, value })
        this.setState({
            list: newList
        }, () => {
            console.log(this.state.list)  //这是最新
        })
        //console.log(this.state.list) //不是最新
        this.inputText.current.value = '';
    }
}


