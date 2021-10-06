import { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import SummaryOrder from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from  'react-redux';
import * as actions from '../../store/actions/index';

const BurgerBuilder = (props) => {
    const [state, setState] = useState({
        purchasing: false,
        purchasFailed: false
    });

    const {
        ings,
        authNow,
        email,
        onAuthSuccesMessage,
        onCheckIfAuthNow,
        onInitIngredients,
        authPurchase,
        buildingBurger,
        history,
        showMessage
    } = props;

   
    const callBackCheckIfAuthPurchase = useCallback(() => {
    
        const checkIfAuthPurchase = () => {
            if(authPurchase && ings !== null && buildingBurger !== false && authNow){        
                  history.push('/checkout');
            } ;
         
         };

        checkIfAuthPurchase();
        
    }, [ authPurchase,
        authNow,
        buildingBurger,
        ings,
        history]);

    useEffect(() => {

        if(!ings){
            onInitIngredients();
        };

        if(authNow === true && email !== undefined){
    
            const name  = email.substring(0, email.lastIndexOf("@"));
            
            onAuthSuccesMessage('Success', `Hello ${name}, Connected successfully`, showMessage)
        };

        onCheckIfAuthNow();

        callBackCheckIfAuthPurchase();
        
    }, [callBackCheckIfAuthPurchase,
        ings,
        authNow,
        email,
        onAuthSuccesMessage,
        onCheckIfAuthNow,
        onInitIngredients,
        showMessage]);
 
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el
        }, 0);
        return sum > 0;
    };

    const purchas = () => {
        if(props.isAuthenticated) {
           
            setState({...state,purchasing: true}) 

        }else {

            props.history.push('/auth');
        
        };
    };

    const purchasContinue = () => {

        props.onInitPurchase();
        props.history.push('/checkout');
        
    }

    const purchasCancel = () => {
        setState({...state,purchasing: false});
    }

    const disabledInfo = {
        ...props.ings
    };

    for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0; 
    }

    let orderSummary = <Spinner />;

    let burger = <Spinner />
    

    if(props.ings || props.error === true){
        
        burger =  (
            <Aux>
        {props.error === true ?
        <div>
          <p style={{color:'red', textAlign: 'center',fontWeight: 'bold'}}>
              Ingredients can't be loaded
          </p>
          </div> :
           <div>
         <Burger ingredient={props.ings}/>
                
         <BuildControls 
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchaseable={updatePurchaseState(props.ings)}
          price={props.price}
          ordered={purchas}
          isAuth={props.isAuthenticated} />
          </div>}   
             </Aux>
        );
        orderSummary = (

            <Aux>
            <SummaryOrder 
                    ingredients={props.ings}
                    price={props.price}
                    purchasCancel={purchasCancel}
                    purchasContinue={purchasContinue}/> 
                   {state.purchasFailed === true ? 
                   <strong style={{color: 'red'}}>Purchas Failed!</strong>
                    :null} 
            </Aux>
        );

    }
    
    return(
        <Aux>
            <Modal show={state.purchasing} modalClosed={purchasCancel}>
               
                {props.error === false ? orderSummary : <Spinner />}
                
            </Modal>

            {burger}
        </Aux>
    )
};

const mapStateToProps = state => {

    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        authPurchase: state.auth.authPurchase,
        authNow: state.auth.authNow,
        email: state.auth.email,
        showMessage: state.message.showMessage
    };
}

const mapDispatchToProps = dispatch => {

    return{
        onIngredientAdded: (ingName) => dispatch (actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch (actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.parchaseInit()),
        onAuthSuccesMessage: (type, text, showMessage) => dispatch(actions.message(type, text, showMessage)),
        onCheckIfAuthNow: () => dispatch(actions.didntAuthNow())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);