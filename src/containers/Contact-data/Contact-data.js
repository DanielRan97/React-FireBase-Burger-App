import { useState } from "react";
import classes from './Contact-data.module.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import withClass from '../../hoc/withClass/withClass';
import Button from '../../components/UI/Button/Button';
import axios from "../../axios/Orders/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";

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
                    maxLength: 5
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
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        formIsValid : false,
        spinner: false
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

        if(rule.minLength){
            isValid = value.length >= rule.minLength && isValid;
        }

        if(rule.maxLength){
            isValid = value.length <= rule.maxLength && isValid;
        }

        return isValid;

    }

    const orderHandeler = () => {
        setState({...state,spinner: true});
        const formData = {};
        for (let formElement in state.orderForm){
            formData[formElement] = state.orderForm[formElement].value
        }
        
        let fixPrice = props.price.toString().match(/^\d+\.?\d{0,2}/)[0]
       
        const order = {
            ingredients: props.ings,
            price: fixPrice,
            orderData: formData
        }
      
        axios.post('/orders.json', order)
       .then(response => {
           setState({...state,spinner: false});
           props.history.push('/');
        })
       .catch(error => {
        setState({...state,spinner: false});
        console.error(error);
        });
    }

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
    }

    const formElementsArry = [];

    for (let key in state.orderForm){
        formElementsArry.push({
            id: key,
            config: state.orderForm[key],
        })
    };

    let form = state.spinner? <Spinner /> :  
    
<form onSubmit={orderHandeler}>

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
    <Button btnType="Success" disabled={!state.formIsValid}>ORDER</Button>

</form>;

    return(
        <Aux>
            
            <h4>Enter your data</h4>

            <div className="orderBugerForm">

                {form}

            </div>
                
        </Aux>
    );

};

const mapStateToProps = state => {

    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withClass(ContactData , classes.ContactData));