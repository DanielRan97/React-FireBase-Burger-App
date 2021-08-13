import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility/upadateObjUtility';

const initialState = {
    orders: [],
    loadin: false,
    purchased: false,
    fetchOrderError: false,
    deleteOrderError:false
};

const purchaseInit = (state) => {

    return updateObject(state, { purchased: false });

};

const purchaseBurgerStart = (state) => {

    return updateObject(state, { loadin: true });

};

const purchaseBurgerSuccess = (state, action) => {

    const newOrder = updateObject(action.orderData, {id: action.orderId}); 

        return updateObject(state,{
            loadin: false,
            order: state.order.concat(newOrder),
            purchased: true
        });

};

const purchaseBurgerFail = (state) => {

    return updateObject(state, { loadin: true });

};

const fetchseOrderStart = (state) => {

    return updateObject(state, { 
        loadin: true,
        fetchOrderError: false
     });


};

const fetchseOrderSuccess = (state,action) => {

    return updateObject(state, { 
        orders: action.orders,
        loadin: false,
        fetchOrderError: false
    });

};

const fetchseOrderFail = (state) => {

    return updateObject(state, { 
        loadin: false,
        fetchOrderError: true
    });

};

const orderReducer = (state = initialState, action) => { 

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return purchaseInit(state);

        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state,action);

        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);

        case actionTypes.FETCH_ORDERS_START: return fetchseOrderStart(state);
         
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchseOrderSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAIL: return fetchseOrderFail(state);

        default: return state;
    };

};

export default orderReducer;