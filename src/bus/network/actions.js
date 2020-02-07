import {createActions} from 'redux-actions';


export const networkActions = createActions(
    {
        // Sync
        SET_NETWORK: status => status,

        // Async
        GET_NETWORK_ASYNC: void 0,

    },
    {
        prefix: 'Network',
        namespace: '.',
    },
);
