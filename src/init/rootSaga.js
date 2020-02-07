import {all, call} from 'redux-saga/effects';


import {watchStatus} from '../bus/status/saga/watchers';


export function*  rootSaga() {
    yield all([
        call(watchStatus),
    ]);
}
