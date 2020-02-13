import {handleActions} from 'redux-actions';
import {commandActions} from './actions';

const initialState = {
    data: {},
};

export const commandReducer = handleActions({
        [commandActions.setCommand]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);