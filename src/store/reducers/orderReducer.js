import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    order: [],
    loadin: false,
    purchased: false
};

const orderReducer = (state = initialState, action) => { 

    switch (action.type) {

        case actionTypes.PURCHASE_INIT:

        return{
            ...state,
            purchased: false
        }

        case actionTypes.PURCHASE_BURGER_START:

        return {
            ...state,
            loadin: true
        };

        case actionTypes.PURCHASE_BURGER_SUCCESS:

        const newOrder = {
            ...action.orderData,
            id: action.orderId,
            purchased: true
        };

        return{
            ...state,
            loadin: false,
            order: state.order.concat(newOrder)
        };

        case actionTypes.PURCHASE_BURGER_FAIL:

        return{
            ...state,
            loadin: false,
        };

        default:
            return state;
    };

};

export default orderReducer;