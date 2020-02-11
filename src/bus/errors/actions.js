import {createActions} from 'redux-actions';


export const errorsActions = createActions(
    {
        // Sync
        SET_ERRORS: status => status,

        // Async
        GET_ERRORS_ASYNC: void 0,

    },
    {
        prefix: 'Errors',
        namespace: '.',
    },
);
