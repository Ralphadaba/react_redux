import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';

import './index.css';
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);   //we could wrap this Provider around App like we do for useContext. And we could do useContext like this



/**
 * root.render(<Provider><App /></Provider>);   //we could wrap this Provider around App like we do for useContext. And we could do useContext like this
 * what's really important is that the children components of the wrapped tags i.e. App, all have access to redux. We should wrap the highest level like this since 
 * our entire app will have access to redux
 * 
 * The {store} being passed to store provides the redux store to our react App
 */
