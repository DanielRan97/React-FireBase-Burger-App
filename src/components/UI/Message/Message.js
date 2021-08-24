import WithClass from '../../../hoc/withClass/withClass';
import classes from './Message.module.css';
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import PropType from 'prop-types';


const Message = (props) => {

    return (

        <div className={classes.message}>
            <div className={[classes.messageBackGround, classes[props.messageType]].join(' ')}>
                <p className={classes.text}>{props.children}</p>
            </div>
        </div>

    );

};

Message.prototype = {
    messageType: PropType.string    
};

export default Message;