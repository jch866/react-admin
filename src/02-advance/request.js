import axios from "axios";
//正在上映
const url1 = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=9930257';
//即将上映
const url2 = 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=9090988';
export default {
    getFilms: (type) => {
        let url = type === 1 ? url1 : url2;
        return axios.get(url, {
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660573198477325485408257","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            console.log(res)
            // this.setState({
            //     list: res.data.data.films
            // })
            return res.data;
        }).catch(error => {
            console.log(error)
        })
    }
}