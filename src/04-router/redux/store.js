//1.引入redux
// 2.createStore(reducer)
import {createStore,combineReducers}  from 'redux';
import CityReducer from './reducers/CityReducer';
import TabbarReducer from './reducers/TabbarReducer';
const reducer = combineReducers({
  CityReducer,TabbarReducer
})
//通过combineReducers 合并多个reducer; 并且相对的取值方式更新，类似于有个命名空间
//reducer来处理具体数据逻辑
// function reducer(prevstate, action){
//     console.log(action)
//     let state = {...prevstate};
//     switch (action.type) {
//         case 'hide-tabbar':
//          state.isTabbarShow = false;
//          return state;
//         case 'show-tabbar':
//           state.isTabbarShow = true;
//           return state;
//         default:
//           return prevstate;
//         }
// }
 
//createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
const store = createStore(reducer);

//let [state,dispatchAction] = useReducer(reducer,initState);
//  {    // store对象   createstore方法将弃用
// @@observable: ƒ observable()
// dispatch: ƒ dispatch(action)
// getState: ƒ getState()
// replaceReducer: ƒ replaceReducer(nextReducer)
// subscribe: ƒ subscribe(listener)
// }
export default store;

/*
var obj = {
  name:'xiaoming'
}
function test(obj2){
  obj2.name = 'libai'
  return obj2
}
test(obj);//obj{name:'libai'}
纯函数：1.对外没有副作用，2.同样的输入得到同样的输出

function test2(obj2){
  let obj = {...obj2};
  obj.name = 'libai' 
  //obj.name = 'libai'+Math.random() 这样写就不是纯函数
  return obj
}
reducer就是一个纯函数
*/







