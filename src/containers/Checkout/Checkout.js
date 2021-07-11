import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import ContactData from '../Contact-data/Contact-data';
import { connect } from 'react-redux';

const Checkout = (props) => {

    const checkoutContinuedHandeler = () => {
        props.history.replace(`/checkout/contact-data`);
    }

    const checkoutCancelledHandeler = () => {
        props.history.goBack();
    }

    return(
        <Aux>

            <CheckoutSummary 
             ingredients={props.ings}
             checkoutCancelled={checkoutCancelledHandeler}
             checkoutContinued={checkoutContinuedHandeler}/>

            <Route 
             path={props.match.path + '/contact-data'} 
             component = {ContactData}/>
        </Aux>

    );
};

const mapStateToProps = state => {

    return {
    ings: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);