import axios from "axios";
//正在上映
const url1 = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=9930257';
//即将上映
const url2 = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=9090988';
//电影详情
const url3 = 'https://m.maizuo.com/gateway?k=6436949&filmId=';
export default {
    getFilms: (type) => {
        let url = type === 1 ? url1 : url2;
        return axios.get(url, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error)
        })
    },
    getDetail:(id)=>{
        let url = `${url3}${id}`;
        return axios.get(url, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
                // 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error)
        })
    }
}