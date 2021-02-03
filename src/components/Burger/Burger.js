import Aux from '../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../hoc/withClass/withClass';
import classes from './Burger.module.css';
import BurgerIngerdient from './BurgerIngredient/BurgerIngredient';
import PropType from 'prop-types';

const burger = (props) => {
  let transformedIngredient = Object.keys(props.ingredient)
        .map(igKey => {
          return [...Array(props.ingredient[igKey])]
          .map((_, index) => {
            return <BurgerIngerdient 
                    key={igKey + index}
                    type={igKey}/>
          });
        }).reduce((arr, el) => {
          return arr.concat(el);
        }, []);

        if(transformedIngredient.length === 0 ){
          transformedIngredient = <p>Please start adding Ingredient!</p>
        }
        
      return(
        <Aux>
          <BurgerIngerdient type="Bread-top"/>
          {transformedIngredient}
          <BurgerIngerdient type="Bread-bottom"/>
        </Aux>
      );
};

burger.prototype = {

  ingredient: PropType.object

}

export default WithClass(burger,classes.Burger);