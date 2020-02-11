import {takeEvery, all, call} from 'redux-saga/effects';

import {siteSetupActions} from '../actions';

import {getSiteSetup} from './workers';

export function* watchGetSiteSetup() {
    yield takeEvery(siteSetupActions.getSiteSetupAsync, getSiteSetup);
}

export function* watchSiteSetup() {
    yield all([call(watchGetSiteSetup)]);
}
