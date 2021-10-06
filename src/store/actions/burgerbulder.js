import axios from "../../axios/Data-base/axios-dataBase";
import * as actionTypes from "./actionsTypes";

export const addIngredient = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) => {

    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) => {

    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients
    };
};

export const fetchIngredientsFailed = () => {

    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
};

export const initIngredients = () => {
   
    return dispatch => {
        axios.get('/ingredients.json').then(respone => {
            dispatch(setIngredients(respone.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        })
    };
};