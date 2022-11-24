

function *testfn(){
    console.log(111)
    let input1 = yield '111-output';
    console.log(222,input1)
    let input2 = yield '222-output';
    console.log(333,input2)
    let input3 = yield '333-output';
    console.log(444,input3)
}

let testFn =  testfn();
let res1 = testFn.next();
console.log(res1)
let res2 = testFn.next('aaa');
console.log(res2)
let res3 = testFn.next('bbb');
console.log(res3)
let res4 = testFn.next('ccc');
console.log(res4)





