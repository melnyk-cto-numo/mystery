import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';


const sagaMiddleware = createSagaMiddleware();

const enhancedStore = applyMiddleware(sagaMiddleware);

export {enhancedStore, sagaMiddleware};
