import {legacy_createStore as createStore,combineReducers} from 'redux';
import {CollapsedReducer} from './reducers/CollapsedReducer';
import {LoadingReducer} from './reducers/LoadingReducer'
console.log(CollapsedReducer)
const reducer = combineReducers({
    CollapsedReducer,LoadingReducer
})
const store = createStore(reducer)
export default store;
// store.dispatch();
// store.subscribe()