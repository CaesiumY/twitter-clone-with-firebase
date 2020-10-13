import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../pages/Auth";
import Home from "../pages/Home";

const AppRouter = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Router>
      <Switch>
        {isAuth ? (
          <>
            <Route exact path="/">
              <Home></Home>
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth></Auth>
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
