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
    },
    getComingsoon:()=>{
        //猫眼即将上映  不是每次都能成功
        //https://i.maoyan.com/ajax/comingList?ci=30&limit=10&movieIds=&token=&optimus_uuid=F10E4F2023AB11ED8AC767432FCE8EC3E6056F125F624C23AB85F1664E9C6576&optimus_risk_level=71&optimus_code=10
        let url = '/ajax/comingList?ci=30&limit=10&movieIds=&token=&optimus_uuid=F10E4F2023AB11ED8AC767432FCE8EC3E6056F125F624C23AB85F1664E9C6576&optimus_risk_level=71&optimus_code=10';
        window.localStorage.setItem('__lxsdk__lxsdk_cuid','181310de1dcc8-0c549449dd113-367a6700-13c680-181310de1dcc8');
        return axios.get(url, {
            headers: {
                'Content-Type':'application/json, text/plain, */*',
            }
        }).then(res => {
            return res.data;
        }).catch(error => {
            console.log(error)
        })
    }
}