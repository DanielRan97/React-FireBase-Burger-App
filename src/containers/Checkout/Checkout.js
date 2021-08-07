import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Contact-data/Contact-data';
import { connect } from 'react-redux';


const Checkout = (props) => {

    const checkoutContinuedHandeler = () => {
        props.history.replace(`/checkout/contact-data`);
    };

    const checkoutCancelledHandeler = () => {
        props.history.goBack();
    };

    let summary = <Redirect to="/"></Redirect>
    
    if(props.ings){

        const purchaseredirect = props.purchased? <Redirect to="/"></Redirect> : null;

        summary =
    <div>
        
        {purchaseredirect}

        <CheckoutSummary 
        ingredients={props.ings}
        checkoutCancelled={checkoutCancelledHandeler}
        checkoutContinued={checkoutContinuedHandeler}/>

        <Route 
        path={props.match.path + '/contact-data'}
        component = {ContactData}/>

    </div>
    }

    return summary;
};;

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased 
    };;
};


export default connect(mapStateToProps)(Checkout);