import {createActions} from 'redux-actions';


export const mysteryActions = createActions(
    {
        // Sync
        SET_SHOW_POPUP: status => status,
        SET_UPLOAD_PROGRESS: status => status,

    },
    {
        prefix: 'Mystery',
        namespace: '.',
    },
);
