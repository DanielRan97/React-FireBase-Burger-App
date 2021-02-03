import { useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import SummaryOrder from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon: 0.7
}

const startPrice = 4;

const BurgerBuilder = () => {
    const [state, setState] = useState({
        ingredient:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: startPrice,
        purchaseable: false,
        purchasing: false
    });

    const updatePurchaseState = (ingredients, newPrice) => {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el
        }, 0);
        setState(
            {
                ...state,
                ingredient:ingredients,
                totalPrice: newPrice,
                purchaseable: sum === 0 ? false : true
            }
            );
    }

    const addIngredient = (type) => {
        const oldCount = state.ingredient[type];
        const updateCount = oldCount + 1;
        const updatIngredient = {
            ...state.ingredient
        };
        updatIngredient[type] = updateCount;
        const priceAddition =  INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setState(
            {
                ...state, 
                totalPrice: newPrice, 
                ingredient: updatIngredient
            }
            );
        updatePurchaseState(updatIngredient,newPrice);
    }

    const removeIngredient = (type) => {
        const oldCount = state.ingredient[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatIngredient = {
            ...state.ingredient
        };
        updatIngredient[type] = updateCount;
        const priceDeduction =  INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setState({...state, totalPrice: newPrice, ingredient: updatIngredient});
        updatePurchaseState(updatIngredient,newPrice);
    }

    const purchas = () => {
        setState({...state,purchasing: true});
    }

    const purchasContinue = () => {
        alert('You continue');
    }

    const purchasCancel = () => {
        setState({...state,purchasing: false})
    }

    const disabledInfo = {
        ...state.ingredient
    };

    for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0; 
    }
    
    return(
        <Aux>
            <Modal show={state.purchasing} modalClosed={purchasCancel}>
               
               <SummaryOrder 
                ingredients={state.ingredient}
                price={state.totalPrice}
                purchasCancel={purchasCancel}
                purchasContinue={purchasContinue}/> 
                
            </Modal>
            
            <Burger ingredient={state.ingredient}/>
            
            <BuildControls 
             ingredientAdded={addIngredient}
             ingredientRemove={removeIngredient}
             disabled={disabledInfo}
             purchaseable={state.purchaseable}
             price={state.totalPrice}
             ordered={purchas}/>

        </Aux>
    )
};

export default BurgerBuilder;