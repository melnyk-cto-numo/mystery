import {handleActions} from 'redux-actions';
import {siteSetupActions} from './actions';

const initialState = {
    data: {},
    xilica: {},
    tesira: {},
    symetrix: {},
    qsys: {},
    jupiter: {},
    hal: {},
    bss: {},
};

export const siteSetupReducer = handleActions({
        [siteSetupActions.setSiteSetup]: (state, {payload}) => ({
            ...state,
            data: payload,
        }),
        [siteSetupActions.setBss]: (state, {payload}) => ({
            ...state,
            bss: payload,
        }),
        [siteSetupActions.setHal]: (state, {payload}) => ({
            ...state,
            hal: payload,
        }),
        [siteSetupActions.setJupiter]: (state, {payload}) => ({
            ...state,
            jupiter: payload,
        }),
        [siteSetupActions.setQsys]: (state, {payload}) => ({
            ...state,
            qsys: payload,
        }),
        [siteSetupActions.setSymetrix]: (state, {payload}) => ({
            ...state,
            symetrix: payload,
        }),
        [siteSetupActions.setTesira]: (state, {payload}) => ({
            ...state,
            tesira: payload,
        }),
        [siteSetupActions.setXilica]: (state, {payload}) => ({
            ...state,
            xilica: payload,
        }),
    },
    initialState,
);