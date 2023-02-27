let nowFn = null;
let counter = 0;
class Reaction {
    static start(handler) {
        nowFn = handler;
    }
    static end() {
        nowFn = null
    }
    constructor() {
        this.id = ++counter;
        this.store = {}    // {id:[fn1,fn2]}
    }
    //bug纪录： collect 之前传了一个nowFn 参数 ，但实际不用传，导致nowFn是undefined
    collect() { 
        if (nowFn) {
            this.store[this.id] = this.store[this.id] || [];
            this.store[this.id].push(nowFn)
        }
    }
    run(){
        let runArray = this.store[this.id] 
        if(Array.isArray(runArray) && runArray.length>0 ){
            runArray.forEach(runner => runner())
        }
    }
}
//收集autorun方法  同时创建当前属性和autorun的关系
export default Reaction;