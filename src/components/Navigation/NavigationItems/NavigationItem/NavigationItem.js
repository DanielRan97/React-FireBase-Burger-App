import classes from './NavigationItem.module.css';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom'

const NavigationItem = (props) => {

  return(

    <li className={props.link == props.page ? classes.NavigationItemSelected : classes.NavigationItem}>
    <NavLink 
     to={props.link}
     onClick={() => props.clicked(props.link)}
     >
              
          {props.children}
   
    </NavLink> 
  </li>

  );

  };

NavigationItem.prototype = {

    link: PropType.string,
    active: PropType.bool,
    children: PropType.string,
    page: PropType.string,
    clicked: PropType.func

}

export default NavigationItem;