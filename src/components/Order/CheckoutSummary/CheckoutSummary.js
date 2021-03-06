import Aux from '../../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../../hoc/withClass/withClass';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {


    return(
        <Aux>
            <h1>We hope it tastes well!</h1>
            
            <div className={classes.Burger}>
           
            <Burger ingredient={props.ingredients}/>

            </div>

            <Button 
            btnType="Danger"
            clicked={props.checkoutCancelled}> 
            CANCEL 
            </Button>

            <Button 
            btnType="Success"
            clicked={props.checkoutContinued}> 
            CONTINUE 
            </Button>

        </Aux>

    );
};

export default WithClass(checkoutSummary, classes.CheckoutSummary);