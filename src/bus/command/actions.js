import {createActions} from 'redux-actions';


export const commandActions = createActions(
    {
        // Sync
        SET_COMMAND: status => status,

        // Async
        GET_COMMAND_ASYNC: void 0,

    },
    {
        prefix: 'Command',
        namespace: '.',
    },
);
