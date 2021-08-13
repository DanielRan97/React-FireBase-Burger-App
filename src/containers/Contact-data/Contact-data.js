import { useState } from "react";
import classes from './Contact-data.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withClass from '../../hoc/withClass/withClass';
import Button from '../../components/UI/Button/Button';
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

const ContactData = (props) => {

    const [state,setState] = useState({
        orderForm: {
            name: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType : 'input',
                elememntConfig : {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    requierd: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    requierd: true
                },
                valid: false,
                touched: false
            },
            postalCode: {
                elementType : 'input',
                elememntConfig : {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    requierd: true,
                    minLength: 5,
                    maxLength: 5,
                    postalCode: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType : 'select',
                elememntConfig : {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'cheapest',
                valid: true,
                touched: false
            }
        },
        formIsValid : false
    });

    const checkIfValid = (value, rule) => {
        
        let isValid = true;

        if(!rule){
            return isValid;
        }

        if(rule.requierd){
            isValid = value.trim() !== '' && isValid;
        }

        if(rule.email){
            const mailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = value.match(mailValidation) && isValid;
        }

        if(rule.postalCode){
            const onlyNumbersValidation = /[0-9]+/;
            isValid = value.match(onlyNumbersValidation) && isValid;
        }

        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid;
        }

        if(rule.maxLength){
            isValid = value.length <= rule.maxLength && isValid;
        }

        return isValid;

    };

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
        props.history.push('/');
    };

    const inputChangeHandler = (event, inputId) => {
       const updatedOrderForm ={
           ...state.orderForm
       } 
       const updatedFormElement = {
           ...updatedOrderForm[inputId]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkIfValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputId] = updatedFormElement;
        
        let formIsValid = true;

        for(let input in updatedOrderForm){
            formIsValid =  updatedOrderForm[input].valid && formIsValid;
        }
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
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withClass(ContactData , classes.ContactData));