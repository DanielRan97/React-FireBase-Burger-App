import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../../utility/upadateObjUtility';

const initialState = {

    token: null,
    userId: null,
    error: null,
    loading: false,
    authPurchase: false

};

const authStart = (state) => {

    return updateObject(state, { error: null, loading: true })
};

const authSuccess = (state, action) => {

    
    return updateObject(state, { 
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        authPurchase: true
     });

};

const authFail = (state, action) => {
    return updateObject(state,{  
        error: action.error,
        loading: false
    });
    
};

const authLogOut = (state) => {

    return updateObject(state, { token: null, userId: null});

};

const stopAuthPurchase = (state) => {

    return updateObject(state,  { authPurchase: false });

};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case actionTypes.AUTH_START: return authStart(state);

        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);

        case actionTypes.AUTH_FAIL: return authFail(state, action);

        case actionTypes.AUTH_LOGOUT: return authLogOut(state);

        case actionTypes.STOP_AUTH_PURCHASE: return stopAuthPurchase(state);
                
        default: return state;
    };

};

export default authReducer;