 
function TabbarReducer(prevstate={
    isTabbarShow:true
}, action){

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
export default TabbarReducer