import { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ( props ) => {
   
const [state,setState] = useState({
    showSideDrawer : false
})

const sideDrawerHandeler = () => {
    setState({...state,showSideDrawer: false});
}

const openSideDrawer = () => {
    setState({...state,showSideDrawer: true});
}
    return(
    <Aux>
    
    <Toolbar 
     openSideDrawer = {openSideDrawer}/>

    <SideDrawer 
     open={state.showSideDrawer} 
     closed={sideDrawerHandeler}/>

    <main className={classes.Content}>

        {props.children}

    </main>

    </Aux>
    )

};

export default Layout;