function CityReducer(prevstate={
    cityname : "北京"
}, action){

    let state = {...prevstate};
    switch (action.type) {
        case 'city-change':
         state.cityname = action.value;
         return state;
        default:
          return prevstate;
        }
}
export default CityReducer