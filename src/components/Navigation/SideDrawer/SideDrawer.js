import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import PropType from 'prop-types';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer, classes.Close];

    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return(
        <Aux>
            <Backdrop 
             show={props.open} 
             clicked={props.closed}/>
       
        <div className={attachedClasses.join(' ')}>
            
        <div className={classes.Logo}>
            <Logo />
        </div>

        <nav>
        <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>

        </div>
        </Aux>
    );
};

sideDrawer.prototype = {

    open: PropType.bool,
    closed: PropType.func

}



export default sideDrawer;