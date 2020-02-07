import {all, call} from 'redux-saga/effects';


import {watchStatus} from '../bus/status/saga/watchers';
import {watchNetwork} from '../bus/network/saga/watchers';


export function* rootSaga() {
    yield all([
        call(watchStatus),
        call(watchNetwork),
    ]);
}
