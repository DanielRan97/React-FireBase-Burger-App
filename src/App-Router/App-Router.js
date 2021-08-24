import Aux from '../hoc/Auxiliary/Auxiliary';
import { Route, Switch, Redirect } from 'react-router-dom'
import asyncComponent from '../hoc/asyncComponent/asyncComponent';
import PageNotFound from '../components/Error-Page/Page-not-found/PageNotFound';
import { connect } from 'react-redux';
const AsyncBurger = asyncComponent(() => import('../containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = asyncComponent(() => import('../containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('../containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('../containers/Auth/Auth'));
const AsyncLogout = asyncComponent(() => import('../containers/Auth/Logout/Logout'));

const AppRouter = (props) => {

    let routes = (

        <Switch>
            <Route path="/" exact component={AsyncBurger}  />
            <Route path="/burger" exact component={AsyncBurger}/>
            <Route path="/auth" component={AsyncAuth}  />
            <Redirect to="/"/>
            <Route render={() => <PageNotFound/> } />
        </Switch>
        );
      
        if(props.isAuthenticated) {
          routes = (
            <Switch>
                <Route path="/" exact component={AsyncBurger}  />
                <Route path="/burger" exact component={AsyncBurger}/>
                <Route path="/checkout" component={AsyncCheckout}  />
                <Route path="/orders" component={AsyncOrders}  />
                <Route path="/logout" component={AsyncLogout}  /> 
                <Redirect to="/"/>
                <Route render={() => <PageNotFound/> } />
            </Switch>
          );
        }

    
        return(
        <Aux>
           {routes}
        </Aux>
        );

};

const mapStateToProps = state => {

    return {
      isAuthenticated: state.auth.token !== null
    };
  
  };

export default connect(mapStateToProps) (AppRouter);