import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useState, useEffect } from 'react';
import PropType from 'prop-types';

const NavigationItems = (props) => {
    
    const [state, setState] = useState({
        page: null
      });

      useEffect(() => {
        props.location ? setState(state => ({...state,page: props.location.pathname })):
        setState(state => ({...state,page: null }));
      },[props.location]) 

    const getPage = (link) => {
        setState({...state,page: link})
        
    };

    let pathname = window.location.pathname.split("/").pop();
    
    if(pathname === '' || pathname === 'burger'){
      pathname = '/burger'
    } else {
        pathname = '/';
    };

    let isNotAuth = (
        <div>
        <NavigationItem link="/burger" clicked={getPage} page={pathname} exact>Burger Builder</NavigationItem> 
        <NavigationItem link="/auth" clicked={getPage} page={state.page}>Authenticate</NavigationItem>
        </div>
    );

    let isAuth = (
        <div>
        <NavigationItem link="/burger" clicked={getPage} page={pathname} exact>Burger Builder</NavigationItem> 
        <NavigationItem link="/orders" clicked={getPage} page={state.page}>Orders</NavigationItem> 
        <NavigationItem link="/logout" clicked={getPage} page={state.page}>Logout</NavigationItem>
        </div>
    );

    return(
        <div>
   
    <ul className={classes.NavigationItems}>
          
    {props.isAuthenticated ?
        isAuth:isNotAuth
    }
   
    </ul>
   
    </div>
    );
   
};

NavigationItems.prototype = {

    clicked: PropType.func

};

export default NavigationItems;