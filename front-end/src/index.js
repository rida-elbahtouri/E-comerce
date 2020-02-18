import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import App from './App';
import CreateAccount from './Component/Accounts/CreateAccount'
import Reducers from './Reducers';

const store=createStore(Reducers,applyMiddleware(thunk))

ReactDOM.render(
//<Provider store={store}>
     <CreateAccount />
//</Provider>
, document.getElementById('root'));
