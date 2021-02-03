import classes from './NavigationItem.module.css';
import PropType from 'prop-types';

const navigationItem = (props) => (

    <li className={classes.NavigationItem}>
      
        <a 
            href={props.link}
            className={props.active ? classes.active : null}>
                {props.children}
        </a>
        
    </li>

);

navigationItem.prototype = {

    link: PropType.string,
    active: PropType.bool,
    children: PropType.string

}

export default navigationItem;