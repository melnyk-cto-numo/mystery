import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {networkActions} from '../../actions';

export function* getNetwork() {
    try {
        const {data} = yield apply(server, server.getNetwork);

        yield put(networkActions.setNetwork(data.network));

    } catch (error) {
        console.error(error);
    }
}
