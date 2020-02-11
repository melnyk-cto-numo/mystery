import {createActions} from 'redux-actions';


export const siteSetupActions = createActions(
    {
        // Sync
        SET_SITE_SETUP: status => status,

        // Async
        GET_SITE_SETUP_ASYNC: void 0,

    },
    {
        prefix: 'Site Setup',
        namespace: '.',
    },
);
