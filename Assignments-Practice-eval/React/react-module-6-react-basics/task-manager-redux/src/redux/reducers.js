import { ADD_TASK, DELETE_TASK, LOGIN, LOGOUT } from './actions';
import { combineReducers } from 'redux';


const tasksInitial = [];
function tasksReducer(state = tasksInitial, action){
switch(action.type){
case ADD_TASK:
return [action.payload, ...state];
case DELETE_TASK:
return state.filter(t => t.id !== action.payload);
default:
return state;
}
}


const authInitial = { user: null, isAuthenticated: false };
function authReducer(state = authInitial, action){
switch(action.type){
case LOGIN:
return { user: action.payload.user, isAuthenticated: true };
case LOGOUT:
return { ...authInitial };
default:
return state;
}
}


const rootReducer = combineReducers({ tasks: tasksReducer, auth: authReducer });
export default rootReducer;