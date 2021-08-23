import axios from 'axios';
import * as actionTypes from './actionsTypes';
import { authErrorFix } from '../../utility/authFormErrUtility';

export const authStart = () => {

    return {
        type: actionTypes.AUTH_START
    };

};

export const authSuccess = (token, userId) => {
    
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    };

};

export const stopAuthPurchase = () => {

    return {
        type: actionTypes.STOP_AUTH_PURCHASE
    };
};

export const authFail = (error) => {

    return {
        type: actionTypes.AUTH_FAIL,
        error
    };

};

export const logOut = () => {

    localStorage.removeItem('burgerAppAuthToken');
    localStorage.removeItem('burgerAppAuthExpirationDate');
    localStorage.removeItem('burgerAppAuthUderId');

    return{
        type: actionTypes.AUTH_LOGOUT
    };

};

export const checkAuthTimeOut = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            
            dispatch(logOut());

        }, expirationTime * 1000)
    };

};

export const auth = (email, password, isSignUp) => {

    return dispatch => {

        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const key = process.env.REACT_APP_FIRE_BASE_APP_KEY;

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

        if(!isSignUp){
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        }

        axios.post(url, authData).then(response => {
            let data = response.data;
            let expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('burgerAppAuthToken', response.data.idToken);
            localStorage.setItem('burgerAppAuthExpirationDate', expirationDate);
            localStorage.setItem('burgerAppAuthUderId', response.data.localId);
            dispatch(authSuccess(data.idToken, data.localId));
            dispatch(checkAuthTimeOut(data.expiresIn));
        }).catch(error => {
            let err = error.response.data.error.message;
            let errorFix = authErrorFix(err);
            dispatch(authFail(errorFix));
        });
    };
};

export const authCheckState = () => {

    return dispatch => {
        const token = localStorage.getItem('burgerAppAuthToken');
        if(!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('burgerAppAuthExpirationDate'));
            if(expirationDate >= new Date()){
                const userId = localStorage.getItem('burgerAppAuthUderId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logOut());
            }
            

        };
    };

};