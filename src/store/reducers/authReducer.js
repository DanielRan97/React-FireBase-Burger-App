import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../utility/upadateObjUtility';

const initialState = {

    token: null,
    userId: null,
    error: null,
    loading: false,
    email: undefined,
    authNow: false,
    authPurchase: false,
    getUserError:false

};

const authStart = (state) => {

    return updateObject(state, { error: null, loading: true, authNow: true })
};

const authSuccess = (state, action) => {
    
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        authPurchase: true,
        email: action.email,
     });

};

const authFail = (state, action) => {
    return updateObject(state,{  
        error: action.error,
        loading: false,
        authNow: false,
        email: undefined,
    });
    
};

const didntAuthNow = (state) => {
    return updateObject(state,{  
        authNow: false
    });
};

const authLogOut = (state) => {

    return updateObject(state, { 
        token: null,
        userId: null,
        error: null,
        loading: false,
        email: undefined,
        authNow: false,
        authPurchase: false,
    });

};

const stopAuthPurchase = (state) => {

    return updateObject(state,  { authPurchase: false });

};

const updateCurrentUser = (state, action) => {
    
    return updateObject(state, {
        email: action.email,
        getUserError: action.getUserError,
    });

};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case actionTypes.AUTH_START: return authStart(state);

        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

        case actionTypes.AUTH_FAIL: return authFail(state, action);

        case actionTypes.AUTH_LOGOUT: return authLogOut(state);

        case actionTypes.STOP_AUTH_PURCHASE: return stopAuthPurchase(state);

        case actionTypes.DIDNT_AUTH_NOW: return didntAuthNow(state);

        case actionTypes.UPDATE_AUTH_CURRENT_USER: return updateCurrentUser(state, action);
                
        default: return state;
    };

};

export default authReducer;