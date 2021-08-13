import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from './Order.module.css';
import withClass from '../../hoc/withClass/withClass';

const order = (props) => {

    let order = props.order;

    let showOrder = null;
    
    const getIngredients = () => {
      showOrder =  Object.keys(order.ingredients).map((i , index) => {
          return(
        <div className={classes.ingDiv} key={index}>
            {order.ingredients[i] > 0 ?
        
            <li className={classes.liIng}> {i} ({order.ingredients[i]})</li> 
            : null}
        </div>
          );

        })

    }    
    
    getIngredients();

    return(

        <Aux>

            <p className={classes.ingredientsP}>Ingredients:</p>

            <div className={classes.ingList}>
            <ul>
                
                {showOrder}
                
            </ul>
            </div>
           
            <p>Price: <strong>USD {order.price}</strong></p>

        </Aux>
    );
   
}

export default withClass(order, classes.Order);