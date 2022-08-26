import request from './../../../request';
const { getCinemaList } = request;
function cinemachange() {
    return (dispatch)=>{
        getCinemaList().then(res=>{
            dispatch({
                type: 'get-cinemalist',
                value: res.data.cinemas
            })
        })
    }
}
 

export { cinemachange };