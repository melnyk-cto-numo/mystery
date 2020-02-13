import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {commandActions} from '../../actions';

export function* getCommand() {
    try {
        const response = yield apply(server, server.getCommand);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(data);
        }

        yield put(commandActions.setCommand(data));
    } catch (error) {
        console.error(error);
    }
}
