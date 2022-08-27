import request from './../../../request';
const { getCinemaList } = request;
//redux-thunk
function cinemachange1() {
    return (dispatch) => {
        getCinemaList().then(res => {
            dispatch({
                type: 'get-cinemalist',
                value: res.data.cinemas
            })
        })
    }
}
//redux-promise
function cinemachange() {
    return getCinemaList().then(res => {
        return {
            type: 'get-cinemalist',
            value: res.data.cinemas
        }
    })
}

export { cinemachange1, cinemachange };