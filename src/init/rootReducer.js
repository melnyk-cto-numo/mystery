import {combineReducers} from 'redux';

import {statusReducer as status} from '../bus/status/reducer';

export const rootReducer = combineReducers({status});
