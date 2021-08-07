import Aux from '../../hoc/Auxiliary/Auxiliary';
import Order from '../../components/Order/Order';
import { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

const Orders = (props) => {

    useEffect(() => {
        
        props.onFetchOrder();
    
    },[]);

    let orders = props.loading ? <Spinner key={Math.random()*1000}/> : props.orders.map((order, index) => {
        return <Order order={order} key={index}/>
    });

    let noOrdersFound = <div className={classes.noOrders} key={Math.random()*1000}> <p>No orders found !</p> </div>
   
    let error = <div className={classes.error} key={Math.random()*1000}> <p>Network Error !</p> </div>

    if(props.orders.length === 0){

        orders = noOrdersFound;

    }

    return(

        <Aux>
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
        fetchOrderError: state.order.fetchOrderError
    }

}

const mapDispatchToProps = dispatch => {

    return{
        onFetchOrder: () => dispatch(actions.fetchOrders())
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);