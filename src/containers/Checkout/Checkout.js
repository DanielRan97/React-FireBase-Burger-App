import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ContactData from '../Contact-data/Contact-data';

const Checkout = (props) => {

    const [state,setState] = useState({
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:0
    });

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        if(props.location.pathname === `/checkout/contact-data`){
            props.history.replace(`/`);
        }
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1]
            }
        }
        setState(state => ({...state, ingredients:ingredients, totalPrice: price}));
    },[])


    const checkoutContinuedHandeler = () => {
        props.history.replace(`/checkout/contact-data`);
    }

    const checkoutCancelledHandeler = () => {
        props.history.goBack();
    }

    return(
        <Aux>

            <CheckoutSummary 
             ingredients={state.ingredients}
             checkoutCancelled={checkoutCancelledHandeler}
             checkoutContinued={checkoutContinuedHandeler}/>

            <Route 
             path={props.match.path + '/contact-data'} 
             render={(props) => (<ContactData ingredients={state.ingredients} price={state.totalPrice} {...props} />)}/>
        </Aux>

    );
}

export default Checkout;