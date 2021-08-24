import classes from './Button.module.css';
import PropType from 'prop-types';


const button = (props) => (

    <button
     type="button"
     disabled={props.disabled}
     onClick={props.clicked}
     className={[classes.Button,classes[props.btnType]].join(' ')}>{props.children}</button>
);

button.prototype = {
    disabled: PropType.bool,
    clicked: PropType.func,
    btnType: PropType.string    

};

export default button;