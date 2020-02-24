import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import Reducers from './Reducers';
import Header from './Component/Header';
import '@fortawesome/fontawesome-free/css/all.min.css'; import
'bootstrap-css-only/css/bootstrap.min.css'; import
'mdbreact/dist/css/mdb.css';
import {BrowserRouter as Router} from 'react-router-dom'


const store=createStore(Reducers,applyMiddleware(thunk))
ReactDOM.render(
<Provider store={store}>
<Router>
<Header />
</Router>
</Provider>
, document.getElementById('root'));
