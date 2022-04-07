import React, { useEffect } from 'react';

import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LayoutPrivate } from '../../../components/Layout';
import { Campaing } from '../../Campaing/Campaing';
import { Home } from '../../Home/Home';
import { CampaingCompany } from '../../CampaingCompany/campanigCompany';
import { ChartsCompany } from '../../ChartsCompany/ChartsCompany';
import { Users } from '../../Users/Users';
import { Profile } from '../../Profile/profile';
import { Company } from '../../Companys/Company';
import { PlanUser } from '../../Plan/planUser';
import { Progress } from '../../Progress/progressUser';
import { ProgressCompany } from '../../Progress/progressCompany';
import { Payments } from '../../Payments/payments';
import { Testimony } from '../../Testimony/testimony';
import { useSelector } from 'react-redux';

export const Private = () => {

  const { authentication } = useSelector((state) => state.auth);


  const IsRender = (Component) => {
    return authentication ? <Component /> : <Redirect to="/" />

  }


  return (
    <Router>
      <LayoutPrivate>
        <Switch className="h-100">
          <Route exact path="/" component={ChartsCompany} />
          <Route exact path="/campaing" render={() => authentication ? <Campaing /> : <Redirect to="/register" />} />
          <Route exact path="/campaingCompany" component={CampaingCompany} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/company" component={Company} />
          <Route exact path="/plan" component={PlanUser} />
          <Route exact path="/progressuser/:userId/:id" component={Progress} />
          <Route exact path="/progrescompany" component={ProgressCompany} />
          <Route exact path="/payments" component={Payments} />
          <Route exact path="/testimony" component={Testimony} />
        </Switch>
      </LayoutPrivate>
    </Router>
  );
};
