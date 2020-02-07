import {createActions} from 'redux-actions';


export const emSetupActions = createActions(
    {
        // Sync
        SET_EM_SETUP: status => status,

        // Async
        GET_EM_SETUP_ASYNC: void 0,

    },
    {
        prefix: 'EmSetup',
        namespace: '.',
    },
);
