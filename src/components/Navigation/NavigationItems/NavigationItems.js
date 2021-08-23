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
        
    }

    return(
        <div>
   
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burger" clicked={getPage} page={state.page} exact>Burger Builder</NavigationItem> 
    
    {props.isAuthenticated ?
        <NavigationItem link="/orders" clicked={getPage} page={state.page}>Orders</NavigationItem> :null
    }

    {!props.isAuthenticated ? 
       <NavigationItem link="/auth" clicked={getPage} page={state.page}>Authenticate</NavigationItem>:
       <NavigationItem link="/logout" clicked={getPage} page={state.page}>Logout</NavigationItem>
    }
    </ul>
   
    </div>
    );
   
};

NavigationItems.prototype = {

    clicked: PropType.func

};

export default NavigationItems;