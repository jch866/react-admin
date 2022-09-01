import { observable, autorun } from 'mobx';
let obj = {
    isTabbarShow:true,
    list:[],
    cityname:''
}

let observObj = observable(obj);
export default observObj