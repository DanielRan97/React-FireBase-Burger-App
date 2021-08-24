import { updateObject } from '../../utility/upadateObjUtility';
import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    showMessage: false,
    messageType: '',
    messageText: ''
};

const resetMessage = (state) => {
   
       return updateObject(state , {
            showMessage: false,
            messageType: '',
            messageText: ''
        });

};

const message = (state, action) => {

    return updateObject(state, { 
        messageType: action.messageType, 
        showMessage: true,
        messageText: action.messageText
    });

};

const messageReducer = (state = initialState, action) => {
   
    switch (action.type) {

        case actionTypes.MESSAGE: return message(state, action);
        case actionTypes.RESET_MESSAGE: return resetMessage(state);
    
        default: return state;
    };
};

export default messageReducer;