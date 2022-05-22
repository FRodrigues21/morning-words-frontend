import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthRoute from './auth_route';
import Login from './login';
import DayWords from './day_words';

const RouteUnderAuth = () => {
  return <p>Auth route nice! Day Words</p>;
};

const Main = () => (
  <main>
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path="/" component={DayWords} />
        <Route path="/login" component={Login} />
        <AuthRoute path="/day_words" component={RouteUnderAuth} />
      </Switch>
    </BrowserRouter>
  </main>
);

export default Main;
