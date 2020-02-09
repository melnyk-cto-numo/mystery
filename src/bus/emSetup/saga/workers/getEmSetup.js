import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {emSetupActions} from '../../actions';

export function* getEmSetup() {
    try {
        const response = yield apply(server, server.getEmSetup);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(emSetupActions.setEmSetup(data));
    } catch (error) {
        console.error(error);
    }
}
