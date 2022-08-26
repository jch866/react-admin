function myCreateStore(reducer){
    let list = [];
    let state = reducer(undefined,{}) // 初始化state
    console.log('myCreateStore');
    function subscribe(callback){
        list.push(callback)
    }
    function dispatch(action){
        state = reducer(state,action);//最到最新的state
        for(var i in list){
            list[i]()
        }
    }
    function getState(){
        return state
    }
    return {
        dispatch,subscribe,getState
    }
}
export default myCreateStore;