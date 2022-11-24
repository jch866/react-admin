function *settimefn(){
    setTimeout(()=>{
        console.log('111-success');
        settimefnres.next();
    },1000)
    yield;
    setTimeout(()=>{
        console.log('222-success');
        settimefnres.next();
    },1000)
    yield;
    setTimeout(()=>{
        console.log('333-success')
    },1000)
    yield;
}
let settimefnres = settimefn();

settimefnres.next();
