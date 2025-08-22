export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


// Thunk middleware (redux-thunk v3 exports named `thunk` used in store)


// Tasks (simulate async with setTimeout)
export const addTask = (task) => (dispatch) => {
return new Promise((resolve) => {
setTimeout(() => { dispatch({ type: ADD_TASK, payload: task }); resolve(task); }, 200);
});
};


export const deleteTask = (id) => (dispatch) => {
return new Promise((resolve) => {
setTimeout(() => { dispatch({ type: DELETE_TASK, payload: id }); resolve(id); }, 150);
});
};
// Auth
export const login = ({ user }) => (dispatch) => {
const auth = { user };
localStorage.setItem('auth', JSON.stringify(auth));
dispatch({ type: LOGIN, payload: auth });
};


export const logout = () => (dispatch) => {
localStorage.removeItem('auth');
dispatch({ type: LOGOUT });
};


export const restoreAuth = () => (dispatch) => {
try {
const raw = localStorage.getItem('auth');
if(raw){ dispatch({ type: LOGIN, payload: JSON.parse(raw) }); }
} catch (_) {}
};