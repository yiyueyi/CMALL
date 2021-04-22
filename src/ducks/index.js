import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer } from 'react-redux-spinner';
import user from './user';

export default combineReducers({
    routing: routerReducer,
    pendingTasks: pendingTasksReducer,
    user,
});
