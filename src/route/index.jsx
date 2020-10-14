import Navigation from "components/Navigation";
import NotFound from "pages/NotFound";
import Profile from "pages/Profile";
import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const AppRouter = ({ isAuth }) => {
  return (
    <Router>
      {isAuth && <Navigation></Navigation>}
      <Switch>
        {isAuth ? (
          <>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/profile">
              <Profile></Profile>
            </Route>

            <Route exact path="*">
              <NotFound></NotFound>
            </Route>
            <Redirect from="*" to="/"></Redirect>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth></Auth>
            </Route>

            <Route exact path="*">
              <NotFound></NotFound>
            </Route>
            <Redirect from="*" to="/"></Redirect>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
