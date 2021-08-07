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
    };

};

export const fetchOrderSuccess = (orders) => {

    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    };

};

export const fetchOrderFail = (error) => {

    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };

};

export const fetchOrderStart = () => {

    return {
        type: actionTypes.FETCH_ORDERS_START,
    };

};

export const fetchOrders = () => {

    return dispatch => {

        dispatch(fetchOrderStart());
        
        axios.get('/orders.json').then((res) => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            };
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrderFail(error));
        });
        
    };
};

export const orderDeleteFail = (error) => {

    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error
    };

};

export const orderDeleteSuccess = (orderId) => {

    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        orderId
    };

};

export const deleteOrder = (orderId) => {

    return dispatch => {
    
        axios.delete(`/orders/${orderId}.json`).then(res => {
            dispatch(orderDeleteSuccess(orderId))
        }).catch(error => {
            dispatch(orderDeleteFail(error))
        })
    }

};


