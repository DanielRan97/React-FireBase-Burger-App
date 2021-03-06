import Layout from '../hoc/Layout/Layout';
import AppRouter from '../App-Router/App-Router';
import Aux from '../hoc/Auxiliary/Auxiliary';

function App() {
  return (

    <Aux>
    
     <Layout>
     
      <AppRouter />
     
     </Layout>
    
    </Aux>
   
  );
}

export default App;
