import {handleActions} from 'redux-actions';
import {siteSetupActions} from './actions';

const initialState = {
    data: {},
};

export const siteSetupReducer = handleActions({
        [siteSetupActions.setSiteSetup]: (state, {payload}) => ({
            ...state,
            data: payload,
        })
    },
    initialState,
);