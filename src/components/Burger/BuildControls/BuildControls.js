import classes from './BuildControls.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../../hoc/withClass/withClass';
import BuildControl from './BuildControl/BuildControl'
import PropType, { bool } from 'prop-types';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';

const buildControls = (props) => {
    
    const controls = [
        { label:'Salad', type:'salad' },
        { label:'Bacon', type:'bacon' },
        { label:'Cheese', type:'cheese' },
        { label:'Meat', type:'meat' }
    ];

    const resetBurger = () => {

        props.onResetBurger();

    };
   
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

        {props.build ? <button 
        className={classes.resetButton} 
        onClick={resetBurger}
        disabled={!props.build}>
          <i className="fas fa-undo"></i>
        </button>: 
        null}

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
};

const mapStateToProps = state => {

    return {
        build: state.burgerBuilder.building
    };

};

const mapDispatchToProps = dispatch => {

    return {
        onResetBurger: () => dispatch(actions.initIngredients())
    };

};

export default connect(mapStateToProps, mapDispatchToProps) (WithClass(buildControls, classes.BuildControls));