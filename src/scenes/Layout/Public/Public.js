import * as React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Demo } from '../../Demo/Demo';
import { Login } from '../../Auth/Login/Login';
import { Register } from '../../Auth/Register/Register';
import { Payment } from '../../Auth/Payment/Payment';

export const Public = () => {
  return (
    <Router>
      <Switch className="h-100">
        <Route exact path="/" component={Login} />
        <Route path="/register/:token" component={Register} />
        <Route exact path="/demo" component={Demo} />
        <Route exact path="/payment" component={Payment} />
      </Switch>
    </Router>
  );
};
