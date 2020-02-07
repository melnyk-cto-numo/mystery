import {handleActions} from 'redux-actions';
import {emSetupActions} from './actions';

const initialState = {
    data: {},
};

export const emSetupReducer = handleActions({
        [emSetupActions.setEmSetup]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);