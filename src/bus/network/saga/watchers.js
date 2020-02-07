import {takeEvery, all, call} from 'redux-saga/effects';

import {networkActions} from '../actions';

import {getNetwork} from './workers';

export function* watchGetNetwork() {
    yield takeEvery(networkActions.getNetworkAsync, getNetwork);
}

export function* watchNetwork() {
    yield all([call(watchGetNetwork)]);
}
