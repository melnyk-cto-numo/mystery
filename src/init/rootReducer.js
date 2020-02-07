import {combineReducers} from 'redux';

import {statusReducer as status} from '../bus/status/reducer';
import {networkReducer as network} from '../bus/network/reducer';
import {emSetupReducer as emSetup} from '../bus/emSetup/reducer';

export const rootReducer = combineReducers({status, network, emSetup});