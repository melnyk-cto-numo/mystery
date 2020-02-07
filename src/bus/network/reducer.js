import {handleActions} from 'redux-actions';
import {networkActions} from './actions';

const initialState = {
    data: {},
};

export const networkReducer = handleActions({
        [networkActions.setNetwork]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);