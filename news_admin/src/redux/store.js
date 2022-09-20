import {legacy_createStore as createStore,combineReducers} from 'redux';
import {CollapsedReducer} from './reducers/CollapsedReducer';
import {LoadingReducer} from './reducers/LoadingReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const reducers = combineReducers({
    CollapsedReducer,LoadingReducer
})
//在localStorge中生成key为root的值
const persistConfig = {
    key: 'myroot',
    storage,
    blacklist:['LoadingReducer']  //设置某个reducer数据不持久化，
  }
const myPersistReducer = persistReducer(persistConfig, reducers)

const store = createStore(myPersistReducer)
const persistor = persistStore(store)

export {
  store,
  persistor
}
// store.dispatch();
// store.subscribe()