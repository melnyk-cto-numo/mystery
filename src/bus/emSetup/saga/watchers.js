import {takeEvery, all, call} from 'redux-saga/effects';

import {emSetupActions} from '../actions';

import {getEmSetup} from './workers';

export function* watchGetEmSetup() {
    yield takeEvery(emSetupActions.getEmSetupAsync, getEmSetup);
}

export function* watchEmSetup() {
    yield all([call(watchGetEmSetup)]);
}
