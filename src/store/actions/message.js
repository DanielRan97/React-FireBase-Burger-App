import * as actionTypes from './actionsTypes';

export const resetMessage = () => {

    return {
        type: actionTypes.RESET_MESSAGE      
    };

};


export const messageStart = (messageType, messageText) => {
    
    
    return {
        type: actionTypes.MESSAGE,
        messageType,
        messageText
        
    };

};

export const message = (messageType, messageText) => {
    

    return dispatch => {

        dispatch(messageStart(messageType, messageText));

        setTimeout(() => {
        dispatch(resetMessage());
        }, 3000)
  
    };

};
