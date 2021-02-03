import classes from './BuildControl.module.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../../../hoc/withClass/withClass';
import PropType from 'prop-types';

const buildControl = (props) => {
    return(
    <Aux>
        <p className={classes.Label}>{props.label}</p>
       
        <button 
        className={classes.Less} 
        onClick={props.remove} 
        disabled={props.disabled}>
            Less
        </button>
        
        <button 
        className={classes.More} 
        onClick={props.added}>
            More
        </button>
    </Aux>
    )
}

buildControl.prototype = {

    label: PropType.string,
    remove: PropType.func,
    disabled: PropType.string,
    added: PropType.func

};

export default WithClass(buildControl, classes.BuildControl);