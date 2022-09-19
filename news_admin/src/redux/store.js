import {legacy_createStore as createStore,combineReducers} from 'redux';
import {CollapsedReducer} from './reducers/CollapsedReducer';
console.log(CollapsedReducer)
const reducer = combineReducers({
    CollapsedReducer
})
const store = createStore(reducer)
export default store;
// store.dispatch();
// store.subscribe()