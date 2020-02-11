import {takeEvery, all, call} from 'redux-saga/effects';

import {errorsActions} from '../actions';

import {getErrors} from './workers';

export function* watchGetErrors() {
    yield takeEvery(errorsActions.getErrorsAsync, getErrors);
}

export function* watchErrors() {
    yield all([call(watchGetErrors)]);
}
