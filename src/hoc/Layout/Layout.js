import { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
     openSideDrawer = {openSideDrawer}
     isAuth={props.isAuthenticated}/>

    <SideDrawer 
     open={state.showSideDrawer} 
     closed={sideDrawerHandeler}
     isAuth={props.isAuthenticated}/>

    <main className={classes.Content}>

        {props.children}

    </main>

    </Aux>
    )

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps) (Layout);