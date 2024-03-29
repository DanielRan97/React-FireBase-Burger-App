import { updateObject } from '../../utility/upadateObjUtility';
import * as actionTypes from '../actions/actionsTypes';

const startPrice = 4;

const initialState = {
    ingredients: null,
    totalPrice: startPrice,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese: 0.4,
    meat:1.3,
    bacon: 0.7
}

const checkIfIngredients = (state, burgerAction) => {
    let ings = state.ingredients ;
    let ingsEmpty = true;
    let num = Object.keys(ings).reduce((sum,key)=>sum+parseFloat(ings[key]||0),0);
    if(burgerAction === "REMOVE"){
        num - 1 !== 0 ? ingsEmpty = true : ingsEmpty = false;
    } else {
        num + 1 !== 0 ? ingsEmpty = true : ingsEmpty = false;
    };
    
    return ingsEmpty;
};

const addIngredient = (state, action) => {
    const updatedIngredient_ADD = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients_ADD = updateObject(state.ingredients, updatedIngredient_ADD);
    const updatedState_ADD = {
        ingredients: updatedIngredients_ADD,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: checkIfIngredients(state, "ADD")
    };
   return updateObject(state, updatedState_ADD);
};

const removeIngredient = (state, action) => {
    const updatedIngredient_REMOVE = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients_REMOVE = updateObject(state.ingredients, updatedIngredient_REMOVE);
    const updatedState_REMOVE = {
        ingredients: updatedIngredients_REMOVE,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: checkIfIngredients(state, "REMOVE")
    };
   return updateObject(state, updatedState_REMOVE);
};

const setIngredient = (state, action) => {
   return updateObject(state,{
        ingredients: {

            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat

        },
        totalPrice: startPrice,
        error: false,
        building: false
    } );
};

const fetchIngredientsFail = (state) => {

    return updateObject(state, {error: true});

};

const burgerBuilderReducer = (state = initialState, action) => {
    
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
      
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);

        case actionTypes.SET_INGREDIENT: return  setIngredient(state, action);

        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredientsFail(state);

        default: return state;
    }
};

export default burgerBuilderReducer;