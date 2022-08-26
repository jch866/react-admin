//1.引入redux
// 2.createStore(reducer)
import {createStore}  from 'redux';
import myCreateStore from "./myCreateStore"
let preloadedState = {
    isTabbarShow:true
}
//reducer来处理具体数据逻辑
function reducer(prevstate, action){
    console.log(action)
    let state = {...prevstate};
    switch (action.type) {
        case 'hide-tabbar':
         state.isTabbarShow = false;
         return state;
        case 'show-tabbar':
          state.isTabbarShow = true;
          return state;
        default:
          return prevstate;
        }
}
 
//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
// const store = createStore(reducer,preloadedState);
const store = myCreateStore(reducer,preloadedState);

//let [state,dispatchAction] = useReducer(reducer,initState);
//  {    // store对象   createstore方法将弃用
// @@observable: ƒ observable()
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// }
export default store;
