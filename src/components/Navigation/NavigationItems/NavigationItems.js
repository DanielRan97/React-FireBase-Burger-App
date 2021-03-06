import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { useState, useEffect } from 'react';

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
        <NavigationItem link="/burger" 
        clicked={getPage} 
        page={state.page}>Burger Builder</NavigationItem> 
        
        <NavigationItem link="/orders" 
        clicked={getPage} 
        page={state.page}>Orders</NavigationItem> 
    </ul>
   
    </div>
    );
   
};

export default NavigationItems;