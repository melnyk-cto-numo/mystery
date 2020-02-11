import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {errorsActions} from '../../actions';

export function* getErrors() {
    try {
        const response = yield apply(server, server.getErrors);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(errorsActions.setErrors(data.siteErrors));
    } catch (error) {
        console.error(error);
    }
}
