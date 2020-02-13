import {combineReducers} from 'redux';

import {statusReducer as status} from '../bus/status/reducer';
import {networkReducer as network} from '../bus/network/reducer';
import {emSetupReducer as emSetup} from '../bus/emSetup/reducer';
import {siteSetupReducer as siteSetup} from '../bus/siteSetup/reducer';
import {errorsReducer as errors} from '../bus/errors/reducer';
import {faderReducer as fader} from '../bus/fader/reducer';
import {commandReducer as command} from '../bus/command/reducer';

export const rootReducer = combineReducers({status, network, emSetup, siteSetup, errors, fader, command});