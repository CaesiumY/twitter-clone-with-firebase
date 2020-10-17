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

const AppRouter = ({ isAuth, userObj }) => {
  return (
    <Router>
      {isAuth && <Navigation></Navigation>}

      {isAuth ? (
        <Switch>
          <Route exact path="/">
            <Home userObj={userObj}></Home>
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj}></Profile>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Auth></Auth>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      )}
    </Router>
  );
};

export default AppRouter;
