import Aux from '../../hoc/Auxiliary/Auxiliary';
import Order from '../../components/Order/Order';
import { useEffect, useState } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

const Orders = (props) => {

    const [showDeleteOrderModalState, setshowDeleteOrderModalState] = useState ({showModal: false, orderId:0});

    useEffect(() => {
        
        props.onFetchOrder(props.token, props.userId);
    
    },[]);

    const showRemoveModal = (orderId) => {

        setshowDeleteOrderModalState({...showDeleteOrderModalState, showModal: true, orderId})

    };

    const removeModalCancel = () => {

        setshowDeleteOrderModalState({...showDeleteOrderModalState,showModal: false});

    };

    const deleteOrder = (token) => {

        token = props.token;

        props.onDeleteOrder(showDeleteOrderModalState.orderId, token);

        removeModalCancel();

    };

    let orders = props.loading ? <Spinner key={Math.random()*1000}/> : props.orders.map((order, index) => {
        return <Order showModal={showRemoveModal} order={order} key={index}/>
    });

    let noOrdersFound = <div className={classes.noOrders} key={Math.random()*1000}> <p>No orders found !</p> </div>
   
    let error = <div className={classes.error} key={Math.random()*1000}> <p>Network Error !</p> </div>

    if(props.orders.length === 0){

        orders = noOrdersFound;

    };

    return(

        <Aux>

        <Modal show={showDeleteOrderModalState.showModal} modalClosed={removeModalCancel}>
            
        <p>Are you sure you want to delete the order?</p>

        <Button btnType={'Danger'} 
             clicked={removeModalCancel}>
                  <i className="fas fa-arrow-left"></i>
            </Button>
            
            <Button btnType={'Danger'} 
             clicked={deleteOrder}>
                  <i className="fas fa-trash-alt"></i>
            </Button>

        </Modal>

            <div>
             { props.fetchOrderError === false  ? [orders] : [error]} 
            </div>

        </Aux>

    );

};

const mapStateToProps = state => {

    return {
        orders: state.order.orders,
        loading: state.order.loading,
        fetchOrderError: state.order.fetchOrderError,
        token: state.auth.token,
        userId: state.auth.userId,
        deleteOrderLoading: state.order.loadingDeleteOrder,
        deleteOrderError: state.order.deleteOrderError
    }

}

const mapDispatchToProps = dispatch => {

    return{
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onDeleteOrder: (id,token) => dispatch(actions.deleteOrder(id,token))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);