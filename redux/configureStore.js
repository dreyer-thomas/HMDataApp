import { createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { devices } from './devices';
import { deviceDetails } from './deviceDetails';
import { chart } from './chartData';

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            devices, 
            deviceDetails,
            chart
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}