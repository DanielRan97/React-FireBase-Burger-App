import Layout from '../hoc/Layout/Layout';
import AppRouter from '../App-Router/App-Router';
import Aux from '../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import { useEffect } from 'react';
import Message from '../components/UI/Message/Message';

function App(props) {

  useEffect(() => {
    props.onTryAutoSignUp();
  },[]);

  let showMessage = null;
  
  if(props.showMessage){
    if(props.messageType === 'Success'){
      showMessage = <Message messageType={props.messageType}>{props.messageText} <i className="fas fa-check"></i></Message>
    } 
    if(props.messageType === 'Danger'){
      showMessage = <Message messageType={props.messageType}>{props.messageText} <i className="fas fa-trash-alt"></i></Message>
    };
  } else {
    showMessage = null;
  }

  return (

    <Aux>
    
     <Layout>

      {showMessage}

      <AppRouter />
     
     </Layout>
    
    </Aux>
   
  );
};

const mapStateToProps = state => {

  return{
    showMessage: state.message.showMessage,
    messageType: state.message.messageType,
    messageText: state.message.messageText
  };

};

const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };

};

export default connect(mapStateToProps, mapDispatchToProps) (App);
