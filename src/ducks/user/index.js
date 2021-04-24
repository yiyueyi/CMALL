import { createAction, createReducer } from 'redux-act';
import _ from 'lodash';
import LocalStorageConstants from 'constants/LocalStorageConstants';

const REDUCER = 'user';
const NS = `@@${REDUCER}/`;

export const setMalls = createAction(`${NS}SET_MALLS`);
export const setUserToken = createAction(`${NS}SET_USER_TOKEN`);

const initState = {
    //当前服务版本
    userToekn: JSON.parse(window.localStorage.getItem(LocalStorageConstants.USER__TOKEN)) || {},
};


export default createReducer(
    {
        [setUserToken]: (state, param) => {
            const userToekn = { ...state.userToekn, param };
            const newState = { ...state, userToekn };
            window.localStorage.setItem(LocalStorageConstants.USER__TOKEN, JSON.stringify(param));
            return newState;
        }
    },
    initState
);
