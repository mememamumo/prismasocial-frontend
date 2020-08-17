import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../Routes/Auth";
import Timeline from "../Routes/Timeline";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Timeline} />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
  <Router>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
