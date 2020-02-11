import {handleActions} from 'redux-actions';
import {errorsActions} from './actions';

const initialState = {
    data: {},
};

export const errorsReducer = handleActions({
        [errorsActions.setErrors]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);