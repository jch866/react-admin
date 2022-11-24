import {take, takeEvery, takeLatest, throttle} from 'redux-saga/effects'
export function * defSaga(){
    let cc  = yield takeEvery('takeEvery',function*(){
        console.log('takeEvery')
    })
    // cc.cancel();
    console.table({...cc});
   yield takeLatest('takeLatest',function*(){
    console.log('takeLatest')
   })
   yield throttle(5000,'throttle',function*(){
    console.log('throttle')
   })

   while(true){
    take('take')
   }
} 