import {apply, put} from 'redux-saga/effects';

import {server} from '../../../../REST';

import {emSetupActions} from '../../actions';

export function* getEmSetup() {
    try {
        const {data} = yield apply(server, server.getEmSetup);


        console.log(data);
        yield put(emSetupActions.setEmSetup(data));

    } catch (error) {
        console.error(error);
    }
}
