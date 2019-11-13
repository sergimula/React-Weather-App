require("@babel/polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
require('./styles/index.css');
import App from './components/App.jsx';
import City from './components/City.jsx';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/city/:name" component={City} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('app')
);
