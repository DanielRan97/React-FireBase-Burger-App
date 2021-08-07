import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from './Order.module.css';
import withClass from '../../hoc/withClass/withClass';
import Button from "../UI/Button/Button";
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Moadal from "../UI/Modal/Modal";


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

    const deletePost = () => {
        console.log('work alone');
        console.log(order.id);
        props.onDeleteOrder(order.id);

    }

    return(

        <Aux>

            <div className={classes.deleteButton}>

                <Button btnType="Danger" clicked={deletePost}><i className="fas fa-minus-square"></i></Button>

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
   
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId))
    };
}

export default connect(null, mapDispatchToProps) (withClass(order, classes.Order));