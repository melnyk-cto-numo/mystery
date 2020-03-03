import {applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';


const loggerMiddleware = createLogger({
    duration: true,
    collapsed: true,
    colors: {
        title: () => '#139bfe',
        error: () => '#ff0005',
    },
});

const sagaMiddleware = createSagaMiddleware();
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnchancers = devtools || compose;

const enhancedStore = composeEnchancers(applyMiddleware(sagaMiddleware, loggerMiddleware));

export {enhancedStore, sagaMiddleware};
