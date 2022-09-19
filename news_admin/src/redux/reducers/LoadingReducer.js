export const  LoadingReducer = (initState={
    isLoading:false
},action)=>{
    let {type} = action;
    switch(type){
        case 'change-loading':
            let newstate = {...initState};
            newstate.isLoading = action.peyload;
            return newstate
        default:
            return initState
    }
  
}