import {takeEvery, all, call} from 'redux-saga/effects';

import {faderActions} from '../actions';

import {getFader} from './workers';

export function* watchGetFader() {
    yield takeEvery(faderActions.getFaderAsync, getFader);
}

export function* watchFader() {
    yield all([call(watchGetFader)]);
}
