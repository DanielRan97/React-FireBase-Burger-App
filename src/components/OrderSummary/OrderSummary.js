import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.module.css';
import Button from '../UI/Button/Button';
import PropType from 'prop-types';
import WithClass from '../../hoc/withClass/withClass';

const orderSummary = (props) => {

const ingredientSummary = Object.keys(props.ingredients)
.map((igKey, index) => {
    return (
        <li key={igKey + index}>
            <span className={classes.liSpan}>
            {igKey}
            </span>: {props.ingredients[igKey]}
        </li>
            )
});

    return( 

        <Aux>

            <h3>Your Order</h3>
                
                <p>A delicious burger with following ingredients:</p>
           
            <ul>
                {ingredientSummary}
            </ul>

            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>

            <p>Continue to Chackout?</p>

            <Button btnType={'Danger'} 
             clicked={props.purchasCancel}>
                 CANCEL
            </Button>
            
            <Button btnType={'Success'} 
             clicked={props.purchasContinue}>
                 CONTINUE
            </Button>

        </Aux>
    );
};

orderSummary.prototype = {

    ingredients: PropType.object,
    price: PropType.number,
    purchasCancel: PropType.func,
    purchasContinue: PropType.func

}

export default WithClass(orderSummary, classes.OrderSummary);