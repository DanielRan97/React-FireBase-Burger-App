import classes from './Message.module.css';
import PropType from 'prop-types';
import {Animated} from "react-animated-css";
import Button from '../Button/Button';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import soundfile from '../../../assets/message.mp3';

const Message = (props) => {

    const closeMessage = () => {
        props.onCloseMessage();
    };

    return (
        
        <div className={classes.message}>

            <audio autoPlay>
                 <source src={soundfile} type="audio/mpeg"/>
                 Your browser does not support the audio tag.
            </audio>
        <Animated animationIn="bounce">
            <div className={[classes.messageBackGround, classes[props.messageType]].join(' ')}>
            <Button btnType="Danger" clicked={closeMessage}><i className="fas fa-times"></i></Button>
                <p className={classes.text}>{props.children}</p>
            </div>
     
        </Animated>
           </div>
    );

};

Message.prototype = {
    messageType: PropType.string    
};

const mapDispatchToProps = dispatch => {

    return {
       onCloseMessage: () => dispatch(actions.resetMessage())
    };
  
  };

export default connect(null, mapDispatchToProps) (Message);