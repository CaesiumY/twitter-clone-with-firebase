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

const AppRouter = ({ isAuth, userObj, onRefreshUser }) => {
  return (
    <Router>
      {isAuth && <Navigation userObj={userObj}></Navigation>}

      {isAuth ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Switch>
            <Route exact path="/">
              <Home userObj={userObj}></Home>
            </Route>
            <Route exact path="/profile">
              <Profile
                userObj={userObj}
                onRefreshUser={onRefreshUser}
              ></Profile>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
            <Redirect from="*" to="/"></Redirect>
          </Switch>
        </div>
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
