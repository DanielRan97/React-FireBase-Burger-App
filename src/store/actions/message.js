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

export const message = (messageType, messageText, showMessage) => {
    
    return dispatch => {
        if(showMessage === true){

            setTimeout(() => {
                dispatch(messageStart(messageType, messageText));
                }, 3000);
            
            setTimeout(() => {
                dispatch(resetMessage());
                }, 6000);

        }else {
            dispatch(messageStart(messageType, messageText));

            setTimeout(() => {
                dispatch(resetMessage());
                }, 3000);
        }
        
    };

};
