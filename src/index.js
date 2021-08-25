import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import{ createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
import messageReducer from './store/reducers/messageReducer';


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose;

const rootReducer = combineReducers({

  burgerBuilder: burgerBuilderReducer,
  order : orderReducer,
  auth : authReducer,
  message: messageReducer

});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(

  <Provider store={store}>
    
    <BrowserRouter basename="/burger-app">
    
      <App />

    </BrowserRouter>

    </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();
