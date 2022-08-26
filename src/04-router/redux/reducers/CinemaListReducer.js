function CinemaListReducer(prevstate={
    list : []
}, action){
    let state = {...prevstate};
    switch (action.type) {
        case 'get-cinemalist':
         state.list = action.value;
         return state;
        default:
          return prevstate;
        }
}
export default CinemaListReducer