import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as actions from '../../../store/actions/index';

const Logout = (props) => {

    const {email, onLogoutMessage, onLogout, showMessage} = props;

    useEffect(() => {
        if(email !== undefined){
            const name  = email.substring(0, email.lastIndexOf("@"));
            onLogoutMessage('Danger', `Buy ${name}, Loguot successfully`, showMessage);
        }
        onLogout();
    }, [email, onLogoutMessage, onLogout, showMessage]);

    return (
        <Redirect to='/'/>
    );

};

const mapStateToPros = state => {

    return {
        email: state.auth.email,
        showMessage: state.message.showMessage
    };

};

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch (actions.logOut()),
        onLogoutMessage: (type, text, showMessage) => dispatch(actions.message(type, text, showMessage))
    };
};

export default connect(mapStateToPros, mapDispatchToProps) (Logout);