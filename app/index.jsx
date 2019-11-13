require("@babel/polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
require('./styles/index.css');
import App from './components/App.jsx';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
