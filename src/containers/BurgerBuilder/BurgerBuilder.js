import { useState, useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import SummaryOrder from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios/axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        purchasing: false,
        spinner: false,
        purchasFailed: false,
        error: false
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
    };

    useEffect(() => {
            axios.get('/ingredients.json')
            .then(response => {
                setState({...state,ingredient: response.data})
            }).catch(error => {
                console.error(error);
                setState({...state,error: true});
            });

    },[]);

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
        setState({...state,spinner: true});
            const order = {
                ingrediant: state.ingredient,
                price: state.totalPrice,
                customer : {
                    name: 'Daniel Ran',
                    address:{
                        street: 'King David 1',
                        zipCode: '26464640',
                        country: 'Germany'
                    },
                    email: 'dani@gmail.com',
                },
                deliveryMethod: 'fastest'
            }
           axios.post('/orders.json', order)
           .then(response => {
               console.log(response);
               setState({...state,spinner: false, purchasFailed: false});
            })
           .catch(error => {
            setState({...state,spinner: false, purchasFailed: true});
            console.log(error);
            }) 
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

    let orderSummary = <Spinner />;

    let burger =  (
        <Aux>
            <Spinner />
        </Aux>
        )

    if(state.ingredient){

        burger =  (
            <Aux>
        {state.error === true ?
        <div>
          <p style={{color:'red', textAlign: 'center',fontWeight: 'bold'}}>
              Ingredients can't be loaded
          </p>
          </div> :
           <div>
         <Burger ingredient={state.ingredient}/>
                
         <BuildControls 
          ingredientAdded={addIngredient}
          ingredientRemove={removeIngredient}
          disabled={disabledInfo}
          purchaseable={state.purchaseable}
          price={state.totalPrice}
          ordered={purchas}/>
          </div>}   
             </Aux>
        );
        orderSummary = (

            <Aux>
            <SummaryOrder 
                    ingredients={state.ingredient}
                    price={state.totalPrice}
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
               
                {state.spinner === false ? orderSummary : <Spinner />}
            </Modal>

            {burger}
        </Aux>
    )
};

export default BurgerBuilder;