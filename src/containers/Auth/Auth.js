import { useEffect, useState } from 'react';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import withClass from '../../hoc/withClass/withClass';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

const Auth = (props) => {

    const [state, setState] = useState({

        authForm:{
            email: {
                elementType : 'input',
                elememntConfig : {
                    type: 'email',
                    placeholder: 'Mail Adress'
                },
                value: '',
                validation: {
                    requierd: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType : 'input',
                elememntConfig : {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    requierd: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid : false,
        isSignUp : true

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

    useEffect(() => {
        if(props.buildingBurger && props.authRedirectPath !=='/') {

            props.onSetAuthRedirectPath(props.authRedirectPath);

        }
    }, []);

    const inputChangeHandler = (event, inputlName) => {
        
        const updatedAuthForm ={
            ...state.authForm
        } 
        const updatedFormElement = {
            ...updatedAuthForm[inputlName]
         };
         updatedFormElement.value = event.target.value;
         updatedFormElement.valid = checkIfValid(updatedFormElement.value, updatedFormElement.validation);
         updatedFormElement.touched = true;
         updatedAuthForm[inputlName] = updatedFormElement;
         
         let formIsValid = true;
 
         for(let input in updatedAuthForm){
             formIsValid =  updatedAuthForm[input].valid && formIsValid;
         }
         setState({...state, authForm: updatedAuthForm, formIsValid: formIsValid});
        
    };

    const formElementsArry = [];

    for (let key in state.authForm){
        formElementsArry.push({
            id: key,
            config: state.authForm[key],
        })
    };

    let form = formElementsArry.map( formElement => (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elememntConfig={formElement.config.elememntConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={(event) => inputChangeHandler(event, formElement.id)}/>
          
    ));

    if(props.loading){
        form = <Spinner></Spinner>
    }

    const sumitHandeler = () => {
        
        props.onAuth(state.authForm.email.value, state.authForm.password.value, state.isSignUp);

    }

    const switchAuthModeHandeler = () => {


        let formType = state.isSignUp;

        setState({...state, isSignUp: !formType});

    };

    let errorMessage = null;

    if(props.error){

        errorMessage = (
            <p className={classes.errorMessage}>{props.error}</p>
        );

    };

    let authRedirect = null;

    if(props.isAuthenticated) {

        authRedirect = <Redirect to={props.authRedirectPath} />

    };

    return(

    <Aux>
        
        {authRedirect}

        <div>

            <form>

                <h2 className={classes.formTitle}>{state.isSignUp? 'SIGN UP' : 'SIGN IN'}</h2>

                {form}

                <div className={classes.authformButton}>

                    <Button btnType={"Success"}  clicked={sumitHandeler}>SUBMIT</Button>

                </div>

                {errorMessage}

                <Button btnType={"Danger"} clicked={switchAuthModeHandeler}>SWITCH TO {state.isSignUp? 'SIGN IN' : 'SIGN UP'}</Button>

             </form>

        </div>

    </Aux>

    );
    
};

const mapStarteToPros = state => {

    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }

}

const mapDispatchToProps = dispatch => {

    return {
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
    };
};

export default connect(mapStarteToPros, mapDispatchToProps) (withClass(Auth, classes.Auth));