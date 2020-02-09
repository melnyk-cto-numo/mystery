import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {statusActions} from '../../actions';

export function* getStatus() {
    try {
        const response = yield apply(server, server.getStatus);
        const data = response.data.Status;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(statusActions.setStatus(data));
    } catch (error) {
        console.error(error);
    }
}
