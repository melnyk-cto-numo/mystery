import {all, call} from 'redux-saga/effects';


import {watchStatus} from '../bus/status/saga/watchers';
import {watchNetwork} from '../bus/network/saga/watchers';
import {watchEmSetup} from '../bus/emSetup/saga/watchers';
import {
    watchSiteSetup,
    watchGetBss,
    watchGetHal,
    watchGetJupiter,
    watchGetQsys,
    watchGetSymetrix,
    watchGetTesira,
    watchGetXilica
} from '../bus/siteSetup/saga/watchers';
import {watchErrors} from '../bus/errors/saga/watchers';
import {watchFader} from '../bus/fader/saga/watchers';
import {watchCommand} from '../bus/command/saga/watchers';

export function* rootSaga() {
    yield all([
        call(watchStatus),
        call(watchNetwork),
        call(watchEmSetup),
        call(watchSiteSetup),
        call(watchErrors),
        call(watchFader),
        call(watchCommand),
        call(watchGetBss),
        call(watchGetHal),
        call(watchGetJupiter),
        call(watchGetQsys),
        call(watchGetSymetrix),
        call(watchGetTesira),
        call(watchGetXilica),
    ]);
}
