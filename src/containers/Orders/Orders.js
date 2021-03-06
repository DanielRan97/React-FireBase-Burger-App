import Aux from '../../hoc/Auxiliary/Auxiliary';
import Order from '../../components/Order/Order';
import { useEffect, useState } from 'react';
import axios from '../../axios/Orders/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.module.css';

const Orders = () => {

    const [state, setState] = useState({
        orders:[],
        loading: true,
        error: false
    });

    const getOrdersFromDB = () => {
        axios.get('/orders.json').then((res) => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            setState(state => ({...state, loading: false, orders : fetchedOrders}));

        }).catch(error => {
            setState(state => ({...state, loading: false, error: true}));
        })

    }

    useEffect(() => {
        getOrdersFromDB();
    },[]);

    let orders = state.loading ? <Spinner key={Math.random()*1000}/> : state.orders.map((order, index) => {
        return <Order order={order} key={index}/>
    });
    
    let error = <div className={classes.error} key={Math.random()*1000}> <p>Network Error !</p> </div>

    return(

        <Aux>
            <div>
             { state.error === false  ? [orders] : [error]} 
            </div>
        </Aux>

    )

}

export default Orders