import burgerLogo from '../../assets/burger-logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt={burgerLogo}></img>
    </div>
)

export default logo;