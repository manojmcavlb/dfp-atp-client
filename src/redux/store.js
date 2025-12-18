import { createStore, combineReducers } from 'redux';
import healthStatusReducer from './reducers';

const rootReducer = combineReducers({
    healthStatus: healthStatusReducer,
});

const store = createStore(rootReducer);

export default store;