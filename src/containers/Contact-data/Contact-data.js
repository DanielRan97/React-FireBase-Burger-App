import { useState } from "react";
import classes from './Contact-data.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withClass from '../../hoc/withClass/withClass';
import Button from '../../components/UI/Button/Button';
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';
import { updateObject } from "../../utility/upadateObjUtility";
import { checkFormsValidations } from "../../utility/checkFormsValidationsUtility";
import orderForm from "../../forms/orderForm";

const ContactData = (props) => {

    const [state,setState] = useState({
       ...orderForm
    });

    const orderHandeler = () => {

        const formData = {};
        for (let formElement in state.orderForm){
            formData[formElement] = state.orderForm[formElement].value
        }
        
        let fixPrice = props.price.toString().match(/^\d+\.?\d{0,2}/)[0]
       
        const order = {
            userId: props.userId,
            ingredients: props.ings,
            price: fixPrice,
            orderData: formData
        }
 
        props.onOrderBurger(order, props.token);
        props.onOrderMessage('Success', 'Your order has been successfully completed', props.showMessagec);
        props.onResetIngs();
        props.history.push('/');
    };

    const inputChangeHandler = (event, inputId) => {
   
       const updatedFormElement = updateObject(state.orderForm[inputId], 
        {
            value: event.target.value,
            valid: checkFormsValidations(event.target.value, state.orderForm[inputId].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(state.orderForm, {
            [inputId]: updatedFormElement
        });
        
        let formIsValid = true;

        for(let input in updatedOrderForm){
            formIsValid =  updatedOrderForm[input].valid && formIsValid;
        };

        setState({...state, orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    const formElementsArry = [];

    for (let key in state.orderForm){
        formElementsArry.push({
            id: key,
            config: state.orderForm[key],
        })
    };

    let form = props.loading? <Spinner /> :  
    
    <form>

    {formElementsArry.map(formElement => (
        <Input 
         key={formElement.id}
         elementType={formElement.config.elementType} 
         elememntConfig={formElement.config.elememntConfig}
         value={formElement.config.value}
         invalid={!formElement.config.valid}
         touched={formElement.config.touched}
         changed={(event) => inputChangeHandler(event, formElement.id)}/>
    ))}

    <Button btnType="Success" clicked={orderHandeler} disabled={!state.formIsValid}>ORDER</Button>

</form>;

    return(
        <Aux>
            
            <h3 className={classes.formTitle}>Enter your data</h3>

            <div className="orderBugerForm">

                {form}

            </div>
                
        </Aux>
    );

};

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
        showMessage: state.message.showMessage
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
        onResetIngs:() => dispatch(actions.initIngredients()),
        onOrderMessage: (type, text, showMessage) => dispatch(actions.message(type, text, showMessage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withClass(ContactData , classes.ContactData));