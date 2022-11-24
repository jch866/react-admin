import { legacy_createStore,applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { defReducer } from "../reducers";

import { defSaga } from "../saga";

const sagaMiddleware = createSagaMiddleware();

const store = legacy_createStore(defReducer,{},applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(defSaga);