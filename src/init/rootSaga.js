import {all, call} from 'redux-saga/effects';


import {watchStatus} from '../bus/status/saga/watchers';
import {watchNetwork} from '../bus/network/saga/watchers';
import {watchEmSetup} from '../bus/emSetup/saga/watchers';
import {watchSiteSetup} from '../bus/siteSetup/saga/watchers';



export function* rootSaga() {
    yield all([
        call(watchStatus),
        call(watchNetwork),
        call(watchEmSetup),
        call(watchSiteSetup),
    ]);
}
