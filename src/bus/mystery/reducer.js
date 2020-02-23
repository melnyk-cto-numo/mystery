import {handleActions} from 'redux-actions';
import {mysteryActions} from './actions';

const initialState = {
    show: false,
    progress: '',
};

export const mysteryReducer = handleActions({
        [mysteryActions.setShowPopup]: (state, {payload}) => ({
            ...state,
            show: payload,
        }),
        [mysteryActions.setUploadProgress]: (state, {payload}) => ({
            ...state,
            progress: payload,
        }),
    },
    initialState,
);