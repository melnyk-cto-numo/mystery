import {takeEvery, all, call} from 'redux-saga/effects';

import {statusActions} from '../actions';

import {getStatus} from './workers';

export function* watchGetStatus() {
    yield takeEvery(statusActions.getStatusAsync, getStatus);
}

export function* watchStatus() {
    yield all([call(watchGetStatus)]);
}
