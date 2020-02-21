import {takeEvery, all, call} from 'redux-saga/effects';

import {siteSetupActions} from '../actions';

import {getSiteSetup, getBss, getHal, getJupiter, getQsys, getSymetrix, getTesira, getXilica} from './workers';

export function* watchGetSiteSetup() {
    yield takeEvery(siteSetupActions.getSiteSetupAsync, getSiteSetup);
}

export function* watchGetBss() {
    yield takeEvery(siteSetupActions.getBssAsync, getBss);
}

export function* watchGetHal() {
    yield takeEvery(siteSetupActions.getHalAsync, getHal);
}

export function* watchGetJupiter() {
    yield takeEvery(siteSetupActions.getJupiterAsync, getJupiter);
}

export function* watchGetQsys() {
    yield takeEvery(siteSetupActions.getQsysAsync, getQsys);
}

export function* watchGetSymetrix() {
    yield takeEvery(siteSetupActions.getSymetrixAsync, getSymetrix);
}

export function* watchGetTesira() {
    yield takeEvery(siteSetupActions.getTesiraAsync, getTesira);
}

export function* watchGetXilica() {
    yield takeEvery(siteSetupActions.getXilicaAsync, getXilica);
}

export function* watchSiteSetup() {
    yield all([
        call(watchGetSiteSetup),
        call(watchGetBss),
        call(watchGetHal),
        call(watchGetJupiter),
        call(watchGetQsys),
        call(watchGetSymetrix),
        call(watchGetTesira),
        call(watchGetXilica),
    ]);
}
