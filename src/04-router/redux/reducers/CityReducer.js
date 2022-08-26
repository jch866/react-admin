function CityReducer(prevstate={
    cityName : "北京"
}, action){

    let state = {...prevstate};
    switch (action.type) {
        case 'city-change':
         state.cityName = action.value;
         return state;
        default:
          return prevstate;
        }
}
export default CityReducer