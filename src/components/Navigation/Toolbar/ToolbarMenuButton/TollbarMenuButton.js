import classes from './TollbarMenuButton.module.css';
import PropType from 'prop-types';

const toolBarButton = (props) => (

    <div>
         <button 
         className={classes.OpenMenu}
         onClick={props.clicked}>
            <i className="fas fa-bars"></i>
        </button>
    </div>

);

toolBarButton.prototype = {

    clicked: PropType.func

}

export default toolBarButton

