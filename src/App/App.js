import Layout from '../hoc/Layout/Layout';
import AppRouter from '../App-Router/App-Router';
import Aux from '../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import { useEffect } from 'react';
import Message from '../components/UI/Message/Message';


function App(props) {

  const {onTryAutoSignUp} = props;

  useEffect(() => {
    onTryAutoSignUp();
  },[onTryAutoSignUp]);

  let showMessage = null;
  
  if(props.showMessage){
    if(props.messageType === 'Success'){
      showMessage = <Message messageType={props.messageType}>{props.messageText}</Message>
    } 
    if(props.messageType === 'Danger'){
      showMessage = <Message messageType={props.messageType}>{props.messageText}</Message>
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
    messageText: state.message.messageText,
  };

};

const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };

};

export default connect(mapStateToProps, mapDispatchToProps) (App);
