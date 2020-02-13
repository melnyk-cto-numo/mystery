import {handleActions} from 'redux-actions';
import {faderActions} from './actions';

const initialState = {
    data: {},
};

export const faderReducer = handleActions({
        [faderActions.setFader]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);