import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "../i18n";
import ScrollToTop from './ScrollToTop';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={App}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;