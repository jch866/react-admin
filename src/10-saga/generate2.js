


function getdata1(){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            reslove('data1')
        },1000)
    })
}
function getdata2(){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            reslove('data2')
        },1000)
    })
}
function getdata3(){
    return new Promise((reslove,reject)=>{
        setTimeout(()=>{
            reslove('data3')
        },1000)
    })
}

function *gen(){
    let f1 = yield getdata1();
    console.log(f1)
    let f2 = yield getdata1(f1);
    console.log(f2)
    let f3 = yield getdata1(f2);
    console.log(f3)
}

function run(fn){
    let g = fn();
    function next(){
        let result = g.next();
        if(result.done){
            return result.value
        }
        result.value.then(res=>{
            next(res);
        })
    }
    next();
}

run(gen)