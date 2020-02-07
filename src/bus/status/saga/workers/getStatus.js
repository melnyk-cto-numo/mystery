import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {statusActions} from '../../actions';

export function* getStatus() {
    try {
        const {data} = yield apply(server, server.getStatus);

        yield put(statusActions.setStatus(data.Status));

    } catch (error) {
        console.error(error);
    }
}
