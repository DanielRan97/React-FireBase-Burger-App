import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from './Order.module.css';
import withClass from '../../hoc/withClass/withClass';
import { prototype } from 'case-sensitive-paths-webpack-plugin';
import  Button  from '../UI/Button/Button';
import { useState } from "react";

const Order = (props) => {

    const [showModalState, setshowModalState] = useState({showModal : props.showModal});

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

        });

    };

    const showRemoveModalHandeler = (orderId) => {

        props.showModal(orderId);

    };

    
    getIngredients();

    return(

        <Aux>
            
            <div className={classes.removeButton}>
                    
                <Button btnType="Danger" clicked={() => showRemoveModalHandeler(order.id)}><i className="fas fa-times"></i></Button>

            </div>

            <p className={classes.ingredientsP}>Ingredients:</p>

            <div className={classes.ingList}>
            <ul>
                
                {showOrder}
                
            </ul>
            </div>
            
            <p>Price: <strong>USD {order.price}</strong></p>

        </Aux>
    );
   
};

Order.prototype = {

    order: prototype.obj,
    showModal: prototype.func

};

export default withClass(Order, classes.Order);