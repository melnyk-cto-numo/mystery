import {handleActions} from 'redux-actions';
import {mysteryActions} from './actions';

const initialState = {
    show: false,
};

export const mysteryReducer = handleActions({
        [mysteryActions.setShowPopup]: (state, {payload}) => ({
            ...state,
            show: payload,
        })
    },
    initialState,
);