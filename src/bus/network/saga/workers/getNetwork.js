import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {networkActions} from '../../actions';

export function* getNetwork() {
    try {
        const response = yield apply(server, server.getNetwork);
        const data = response.data.network;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(networkActions.setNetwork(data));
    } catch (error) {
        console.error(error);
    }
}
