 
export const  CollapsedReducer = (initState={
    isCollapsed:false
},action)=>{
    let {type} = action;
    switch(type){
        case 'change-collapsed':
            let newstate = {...initState};
            newstate.isCollapsed = !newstate.isCollapsed;
            return newstate
        default:
            return initState
    }
  
}