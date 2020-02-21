import {createActions} from 'redux-actions';


export const siteSetupActions = createActions(
    {
        // Sync
        SET_SITE_SETUP: status => status,
        SET_XILICA: status => status,
        SET_TESIRA: status => status,
        SET_SYMETRIX: status => status,
        SET_QSYS: status => status,
        SET_JUPITER: status => status,
        SET_HAL: status => status,
        SET_BSS: status => status,

        // Async
        GET_SITE_SETUP_ASYNC: void 0,
        GET_BSS_ASYNC: status => status,
        GET_HAL_ASYNC: status => status,
        GET_JUPITER_ASYNC: status => status,
        GET_QSYS_ASYNC: status => status,
        GET_SYMETRIX_ASYNC: status => status,
        GET_TESIRA_ASYNC: status => status,
        GET_XILICA_ASYNC: status => status,
    },
    {
        prefix: 'Site Setup',
        namespace: '.',
    },
);
