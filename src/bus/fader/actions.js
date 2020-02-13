import {createActions} from 'redux-actions';


export const faderActions = createActions(
    {
        // Sync
        SET_FADER: status => status,

        // Async
        GET_FADER_ASYNC: void 0,

    },
    {
        prefix: 'Fader',
        namespace: '.',
    },
);
