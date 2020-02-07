import {createActions} from 'redux-actions';


export const statusActions = createActions(
    {
        // Sync
        SET_STATUS: status => status,

        // Async
        GET_STATUS_ASYNC: void 0,

    },
    {
        prefix: 'Status',
        namespace: '.',
    },
);
