import classes from './BuildControls.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../../hoc/withClass/withClass';
import BuildControl from './BuildControl/BuildControl'
import PropType, { bool } from 'prop-types';

const buildControls = (props) => {
    
    const controls = [
        { label:'Salad', type:'salad' },
        { label:'Bacon', type:'bacon' },
        { label:'Cheese', type:'cheese' },
        { label:'Meat', type:'meat' }
    ];
   
   return(
    <Aux>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map(ctrl => { 
          return  <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    remove={() => props.ingredientRemove(ctrl.type)} 
                    disabled={props.disabled[ctrl.type]}/>
        })}
        <button 
        className={classes.OrderButton} 
        onClick={props.ordered}>
           {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
        </button>

    </Aux>
   )

};

buildControls.prototype = {
    ingredientAdded: PropType.func,
    ingredientRemove: PropType.func,
    purchaseable: bool,
    ordered: PropType.func
}

export default WithClass(buildControls, classes.BuildControls )