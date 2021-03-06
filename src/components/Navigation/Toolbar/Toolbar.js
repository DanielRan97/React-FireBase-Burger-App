import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToolbarMenuButton from './ToolbarMenuButton/TollbarMenuButton';
import PropType from 'prop-types';
import { Switch } from 'react-router-dom';

const toolbar = (props) => (
    
    <header className={classes.Toolbar}>
        
        <ToolbarMenuButton 
         className={classes.OpenMenu}
         clicked={props.openSideDrawer}
        />
       
        <div className={classes.Logo}>
            <Logo />
        </div>
      
        <nav className={classes.DesktopOnly}>
            <Switch>
            <NavigationItems /> 
            </Switch>
        </nav>
   
    </header>
);

toolbar.prototype = {

    openSideDrawer: PropType.func

}

export default toolbar;