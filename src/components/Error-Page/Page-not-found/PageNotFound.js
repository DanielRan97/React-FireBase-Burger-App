import Aux from '../../../hoc/Auxiliary/Auxiliary';
import WithClass from '../../../hoc/withClass/withClass';
import classes from './PageNotFound.module.css';

const PageNotFound = () => {

   
   
   return(

    <Aux>
        
        <h1>Error!</h1>

        <h2>Page not found</h2>

    </Aux>

   );

}

export default WithClass(PageNotFound, classes.PageNotFound);