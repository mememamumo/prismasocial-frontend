import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Timeline from "../Routes/Timeline";
import Search from "../Routes/Search";
import Profile from "../Routes/Profile";
import SeePost from "../Routes/SeePost";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Timeline} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/post/:postId" component={SeePost} />
    <Route exact path="/:username" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;
