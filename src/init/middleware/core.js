import {applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();
const composeEnchancers = compose;

const enhancedStore = composeEnchancers(applyMiddleware(sagaMiddleware));

export {enhancedStore, sagaMiddleware};
