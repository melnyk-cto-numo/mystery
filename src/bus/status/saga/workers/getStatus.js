import {apply, put} from 'redux-saga/effects';

import {api} from '../../../../REST';

import {statusActions} from '../../actions';

export function* getStatus() {
    try {
        const {data} = yield apply(api, api.status.getStatus);

        yield put(statusActions.setStatus(data.Status));

    } catch (error) {
        console.error(error);
    }
}
