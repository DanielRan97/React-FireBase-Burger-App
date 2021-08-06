import { useState, useEffect } from 'react';
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
        purchasFailed: false,
    });

    useEffect(() => {
        props.onInitIngredients();
    }, []);

 
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

 

    // const addIngredient = (type) => {
    //     const oldCount = state.ingredient[type];
    //     const updateCount = oldCount + 1;
    //     const updatIngredient = {
    //         ...state.ingredient
    //     };
    //     updatIngredient[type] = updateCount;
    //     const priceAddition =  props.price[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     setState(
    //         {
    //             ...state, 
    //             totalPrice: newPrice, 
    //             ingredient: updatIngredient
    //         }
    //         );
    //     updatePurchaseState(updatIngredient,newPrice);
    // }

    // const removeIngredient = (type) => {
    //     const oldCount = state.ingredient[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updateCount = oldCount - 1;
    //     const updatIngredient = {
    //         ...state.ingredient
    //     };
    //     updatIngredient[type] = updateCount;
    //     const priceDeduction =  props.price[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     setState({...state, totalPrice: newPrice, ingredient: updatIngredient});
    //     updatePurchaseState(updatIngredient,newPrice);
    // }

    const purchas = () => {
        setState({...state,purchasing: true});
    }

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
          ordered={purchas}/>
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
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => {

    return{
        onIngredientAdded: (ingName) => dispatch (actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch (actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.parchaseInit())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);