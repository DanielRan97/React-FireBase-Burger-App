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

    const [state, setState] = useState ({
        showModal: false, orderId:0,
        modalButtonDisabled: false,
        modalLoading: false
        });

    useEffect(() => {
        
        props.onFetchOrder(props.token, props.userId);
    
    },[]);

    const showRemoveModal = (orderId) => {

        setState({...state, showModal: true, orderId})

    };

    let deleteModalContent = state.modalLoading === false? <p>Are you sure you want to delete the order?</p> : <Spinner />;

    const removeModalCancel = () => {

        setState({...state,showModal: false, modalButtonDisabled: false, modalLoading: false, orderId: 0 });

    };

    const deleteOrder = (token) => {

        setState({ ...state, modalButtonDisabled: true, modalLoading: true });

        token = props.token;

        props.onDeleteOrder(state.orderId, token);

        removeModalCancel();

        props.onOrderMessage('Danger', 'Your order has been successfully deleted');

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

        <Modal show={state.showModal} modalClosed={removeModalCancel}>
            
            {deleteModalContent}

        <Button btnType={'Danger'} 
             clicked={removeModalCancel}
             disabled={state.modalButtonDisabled}>
                  <i className="fas fa-arrow-left"></i>
            </Button>
            
            <Button btnType={'Danger'} 
             clicked={deleteOrder}
             disabled={state.modalButtonDisabled}>
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
        onDeleteOrder: (id,token) => dispatch(actions.deleteOrder(id,token)),
        onOrderMessage: (type, text) => dispatch(actions.message(type, text))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);