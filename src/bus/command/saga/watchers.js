import {takeEvery, all, call} from 'redux-saga/effects';

import {commandActions} from '../actions';

import {getCommand} from './workers';

export function* watchGetCommand() {
    yield takeEvery(commandActions.getCommandAsync, getCommand);
}

export function* watchCommand() {
    yield all([call(watchGetCommand)]);
}
