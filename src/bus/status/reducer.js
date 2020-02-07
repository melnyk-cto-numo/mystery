import {handleActions} from 'redux-actions';
import {statusActions} from './actions';

const initialState = {
    data: {},
};

export const statusReducer = handleActions({
        [statusActions.setStatus]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);