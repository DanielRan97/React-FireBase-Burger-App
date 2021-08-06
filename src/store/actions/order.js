import axios from '../../axios/Orders/axios-orders';
import * as actionTypes from '../actions/actionsTypes';

export const purchaseBurgerSuccess = (id,orderData) => {

    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }

};

export const purchaseBurgerFail = (error) => {

    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }

};

export const purchaseBurgerStart = () => {

    return {
        type: actionTypes.PURCHASE_BURGER_START
    }

}

export const purchaseBurger = ( orderData ) => {
    
    return dispatch => {
        
       dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
         })
        .catch(error => {
         dispatch(purchaseBurgerFail(error));
         });
    };

};

export const parchaseInit = () => {

    return {
        type: actionTypes.PURCHASE_INIT
    }

}