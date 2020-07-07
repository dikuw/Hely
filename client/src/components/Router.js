import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/cart" component={App}/>
      <Route exact path="/shipping" component={App}/>
      <Route exact path="/returns" component={App}/>
      <Route exact path="/privacy" component={App}/>
      <Route exact path="/terms" component={App}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;