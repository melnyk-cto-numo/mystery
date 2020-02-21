import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {siteSetupActions} from '../../actions';

export function* getXilica() {
    try {
        const response = yield apply(server, server.getXilica);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(siteSetupActions.setXilica(data));
    } catch (error) {
        console.error(error);
    }
}
