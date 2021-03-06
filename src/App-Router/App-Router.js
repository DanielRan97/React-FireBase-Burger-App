import Aux from '../hoc/Auxiliary/Auxiliary';
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import PageNotFound from '../components/Error-Page/Page-not-found/PageNotFound';
const AsyncBurger = asyncComponent(() => import('../containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = asyncComponent(() => import('../containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('../containers/Orders/Orders'));


const AppRouter = () => {

    
        return(
        <Aux>
            <Switch>
            <Route path="/burger" exact component={AsyncBurger}  />
            <Route path="/checkout" component={AsyncCheckout}  />
            <Route path="/orders" component={AsyncOrders}  />
            <Redirect from="/" to="/burger" />  
            <Route render={() => <PageNotFound/> } />
            </Switch>
        </Aux>
        );

};

export default AppRouter;