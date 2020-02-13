import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {faderActions} from '../../actions';

export function* getFader() {
    try {
        const response = yield apply(server, server.getFader);
        const data = response.data.fader;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(faderActions.setFader(data));
    } catch (error) {
        console.error(error);
    }
}
