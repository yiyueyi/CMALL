import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer } from 'react-redux-spinner';
import seller from './seller';

export default combineReducers({
    routing: routerReducer,
    pendingTasks: pendingTasksReducer,
    seller,
});
