import classes from './BurgerIngredient.module.css';
import PropType from 'prop-types';

const BurgerIngerdient = (props) => {

    let ingerdient = null;

    switch(props.type){
        case 'Bread-bottom':
            ingerdient = <div className={classes.BreadBottom}></div>
        break;
        case 'Bread-top':
            ingerdient = (
            <div className={classes.BreadTop}>
                <div className={classes.seed1}></div>
                <div className={classes.seed2}></div>
            </div>
            );
        break;
        case  'meat':
            ingerdient = <div className={classes.Meat}></div>;
        break;
        case  'cheese':
            ingerdient = <div className={classes.Cheese}></div>;
        break;
        case  'salad':
            ingerdient = <div className={classes.Salad}></div>;
        break;
        case  'bacon':
            ingerdient = <div className={classes.Bacon}></div>;
        break;
        
        default:
            ingerdient = null;
    }
    return ingerdient;
};

BurgerIngerdient.prototype = {
    type: PropType.string.isRequired
}

export default BurgerIngerdient;