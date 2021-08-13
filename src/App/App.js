import Layout from '../hoc/Layout/Layout';
import AppRouter from '../App-Router/App-Router';
import Aux from '../hoc/Auxiliary/Auxiliary';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import { useEffect } from 'react';

function App(props) {

  useEffect(() => {
    props.onTryAutoSignUp();
  },[]);

  return (

    <Aux>
    
     <Layout>
     
      <AppRouter />
     
     </Layout>
    
    </Aux>
   
  );
};

const mapDispatchToProps = dispatch => {

  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };

};

export default connect(null, mapDispatchToProps) (App);
